import { join } from 'node:path';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { IEnvVariables } from './config/types/env-variables.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IEnvVariables>);
  const port = configService.get<number>('PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'detection',
      protoPath: join(__dirname, 'proto/detection.proto'),
      url: `localhost:${port}`,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
