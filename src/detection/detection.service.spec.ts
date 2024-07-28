import * as fs from 'node:fs';

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ImagesModule } from '../images/images.module';
import { DetectionService } from './detection.service';
import { DetectionObject } from './enums/detection-object.enum';
import { DETECTION_IMAGES_WITH_RESULT_FOR_TEST } from './mock/images';
import { IDetection } from './types/detection.types';

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

  it("'detectLabelsInImages' should detect labels in images", async () => {
    const detectionImagesWithResult = DETECTION_IMAGES_WITH_RESULT_FOR_TEST;

    const buffers = await Promise.all(
      detectionImagesWithResult.map((detectionImage) =>
        fs.promises.readFile(detectionImage.path),
      ),
    );
    const detections = await service.detectLabelsInImages(buffers);

    expect(detections).toBeDefined();
    expect(detections).toBeInstanceOf(Array);
    expect(detections).toHaveLength(detectionImagesWithResult.length);

    detections.forEach((detection, index) => {
      const detectionImageWithResult = detectionImagesWithResult[index];

      const groupedDetections = detection.reduce(
        (acc, detection) => ({
          ...acc,
          [detection.object]: [...(acc[detection.object] || []), detection],
        }),
        {} as Record<DetectionObject, IDetection[]>,
      );

      Object.entries(groupedDetections).forEach(([object, detections]) => {
        const count =
          detectionImageWithResult.result[object as DetectionObject].count;

        if (typeof count === 'number') {
          expect(detections).toHaveLength(count);
        }
        if (typeof count === 'object') {
          expect(detections.length).toBeGreaterThanOrEqual(count.min);
          expect(detections.length).toBeLessThanOrEqual(count.max);
        }
      });
    });
  });

  it("'detectLabelsInImage' should detect labels in an image", async () => {
    const detectionImageWithResult = DETECTION_IMAGES_WITH_RESULT_FOR_TEST[2];

    const buffer = await fs.promises.readFile(detectionImageWithResult.path);
    const detections = await service.detectLabelsInImage(buffer);

    expect(detections).toBeDefined();
    expect(detections).toBeInstanceOf(Array);

    const groupedDetections = detections.reduce(
      (acc, detection) => ({
        ...acc,
        [detection.object]: [...(acc[detection.object] || []), detection],
      }),
      {} as Record<DetectionObject, IDetection[]>,
    );

    Object.entries(groupedDetections).forEach(([object, detections]) => {
      const count =
        detectionImageWithResult.result[object as DetectionObject].count;

      if (typeof count === 'number') {
        expect(detections).toHaveLength(count);
      }
      if (typeof count === 'object') {
        expect(detections.length).toBeGreaterThanOrEqual(count.min);
        expect(detections.length).toBeLessThanOrEqual(count.max);
      }
    });
  });
});
