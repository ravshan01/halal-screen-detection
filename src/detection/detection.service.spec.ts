import * as fs from 'node:fs';

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ImagesModule } from '../images/images.module';
import {
  DetectImagesRequest,
  type Detection,
  DetectionObject,
  Image,
} from '../proto/detection';
import { DetectionService } from './detection.service';
import { DETECTION_IMAGES_WITH_RESULT_FOR_TEST } from './mock/images';

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
    const response = await service.detectLabelsInImages(
      DetectImagesRequest.create({
        images: buffers.map((buffer) => Image.create({ content: buffer })),
      }),
    );

    expect(response).toBeDefined();
    expect(response.detections).toBeDefined();
    expect(response.detections).toHaveLength(detectionImagesWithResult.length);

    response.detections.forEach((imageDetections, index) => {
      const groupedDetections = imageDetections.detections.reduce(
        (acc, detection) => ({
          ...acc,
          [detection.object]: [...(acc[detection.object] || []), detection],
        }),
        {} as Record<DetectionObject, Detection[]>,
      );

      Object.entries(groupedDetections).forEach(([object, detections]) => {
        const count =
          detectionImagesWithResult[index].result[
            object as unknown as DetectionObject
          ].count;

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
});
