import { readFile } from 'node:fs/promises';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { IEnvVariables } from '../config/types/env-variables.type';
import { ImagesModule } from '../images/images.module';
import {
  DetectErrorCode,
  DetectImagesRequest,
  type Detection,
  DetectionObject,
  Image,
  ImageDetections_ErrorCode,
} from '../proto/detection';
import { DetectionService } from './detection.service';
import { DETECTION_IMAGES_WITH_RESULT_FOR_TEST } from './mock/images';

describe('DetectionService', () => {
  let service: DetectionService;
  let configService: ConfigService<IEnvVariables>;

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
    configService = module.get<ConfigService<IEnvVariables>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('DetectLabelsInImages', () => {
    it.each([
      {
        title: 'should return an BadRequest error, if no images are provided',
        images: undefined,
      },
      {
        title:
          'should return an BadRequest error, if empty array of images is provided',
        images: [],
      },
    ])('$title', async ({ images }) => {
      const res = await service.DetectLabelsInImages(
        DetectImagesRequest.create({ images }),
      );

      expect(res).toBeDefined();
      expect(res.error).toBeDefined();
      expect(res.error.code).toBe(DetectErrorCode.BadRequest);
    });

    it('should return an MaxImagesExceeded error, if many images are provided', async () => {
      const maxImages = configService.get('MAX_IMAGES_PER_REQUEST');
      const image = await readFile(
        DETECTION_IMAGES_WITH_RESULT_FOR_TEST[0].path,
      );
      const images = Array.from({ length: maxImages + 1 }, () =>
        Image.create({ content: image }),
      );

      const res = await service.DetectLabelsInImages(
        DetectImagesRequest.create({ images }),
      );

      expect(res).toBeDefined();
      expect(res.error).toBeDefined();
      expect(res.error.code).toBe(DetectErrorCode.MaxImagesExceeded);
    });

    it('should return ImageDetections.Error with InvalidImage code, if invalid image provided', async () => {
      const res = await service.DetectLabelsInImages(
        DetectImagesRequest.create({
          images: [Image.create({ content: Buffer.from('Invalid image') })],
        }),
      );

      expect(res).toBeDefined();
      expect(res.detections).toBeDefined();
      expect(res.detections[0]).toBeDefined();
      expect(res.detections[0].error).toBeDefined();
      expect(res.detections[0].error.code).toBe(
        ImageDetections_ErrorCode.InvalidImage,
      );
    });

    it.skip('should detect labels in images', async () => {
      const detectionImagesWithResult = DETECTION_IMAGES_WITH_RESULT_FOR_TEST;

      const buffers = await Promise.all(
        detectionImagesWithResult.map((detectionImage) =>
          readFile(detectionImage.path),
        ),
      );
      const res = await service.DetectLabelsInImages(
        DetectImagesRequest.create({
          images: buffers.map((buffer) => Image.create({ content: buffer })),
        }),
      );

      expect(res).toBeDefined();
      expect(res.detections).toBeDefined();
      expect(res.detections).toHaveLength(detectionImagesWithResult.length);

      res.detections.forEach((imageDetections, index) => {
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
    }, 10000);
  });
});
