import * as fs from 'node:fs';
import { join } from 'node:path';

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ImagesModule } from '../images/images.module';
import { DetectionService } from './detection.service';

describe('DetectionService', () => {
  let service: DetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test', '.env.test.local'],
        }),
        ImagesModule,
      ],
      providers: [DetectionService],
    }).compile();

    service = module.get<DetectionService>(DetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect labels in an image', async () => {
    const buffer = await fs.promises.readFile(
      join(__dirname, './mock/images/room.jpg'),
    );
    const labels = await service.detectLabelsInImage(buffer);

    expect(labels).toBeDefined();
  });
});
