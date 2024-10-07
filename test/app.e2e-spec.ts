import * as fs from 'node:fs';
import { join } from 'node:path';
import * as process from 'node:process';

import { firstValueFrom, Observable } from 'rxjs';

import { INestMicroservice } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { IEnvVariables } from '../src/config/types/env-variables.type';
import {
  type DetectImagesRequest as IDetectImagesRequest,
  DetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
  Image,
} from '../src/proto/detection';

describe('AppController (e2e)', () => {
  let microservice: INestMicroservice;
  let detectionService: {
    DetectImages: (
      request: IDetectImagesRequest,
    ) => Observable<IDetectImagesResponse>;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.registerAsync([
          {
            name: 'DETECTION_CLIENT',
            useFactory: (configService: ConfigService<IEnvVariables>) => ({
              transport: Transport.GRPC,
              options: {
                package: 'detection',
                protoPath: join(process.cwd(), 'src/proto/detection.proto'),
                url: `localhost:${configService.get<IEnvVariables['PORT']>('PORT')}`,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
    }).compile();

    const configService = moduleFixture.get(ConfigService<IEnvVariables>);
    const port = configService.get<IEnvVariables['PORT']>('PORT');

    microservice = moduleFixture.createNestMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'detection',
        protoPath: join(process.cwd(), 'src/proto/detection.proto'),
        url: `localhost:${port}`,
      },
    });
    await microservice.listen();

    const detectionClient: ClientGrpc = moduleFixture.get('DETECTION_CLIENT');
    detectionService = detectionClient.getService('DetectionService');
  });
  afterAll(async () => {
    await microservice.close();
  });

  describe('AppController.DetectImages', () => {
    it('should detect images and return detections', async () => {
      const image = await fs.promises.readFile(
        join(process.cwd(), 'src/images/mock/image.jpg'),
      );

      const observable = detectionService.DetectImages(
        DetectImagesRequest.create({
          images: [Image.create({ content: image })],
        }),
      );
      const data = await firstValueFrom(observable);

      expect(data).toBeDefined();
      expect(data.detections).toBeDefined();
      expect(data.detections.length).toBe(1);
    }, 0);

    it.todo(
      'should return an error, ' +
        'if a file of a different format was transferred under the image,' +
        'returning the detection result for correctly transmitted images',
    );
  });
});
