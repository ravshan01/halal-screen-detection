import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  DetectErrorCode,
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
  DetectImagesResponse,
} from '../proto/detection';
import { DETECTION_SERVICE_KEY, IDetectionService } from './detection.provider';

@Controller()
export class DetectionController {
  constructor(
    @Inject(DETECTION_SERVICE_KEY)
    private detectionService: IDetectionService,
  ) {}

  @GrpcMethod('DetectionService')
  async DetectImages(
    data: IDetectImagesRequest,
  ): Promise<IDetectImagesResponse> {
    try {
      return await this.detectionService.DetectLabelsInImages(data);
    } catch (err) {
      console.error(err);

      return DetectImagesResponse.create({
        error: {
          code: DetectErrorCode.InternalError,
          message: err.message,
        },
      });
    }
  }
}
