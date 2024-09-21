import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
} from '../proto/detection';
import {
  DETECTION_PROVIDER_KEY,
  IDetectionProvider,
} from './detection.provider';

@Controller()
export class DetectionController {
  constructor(
    @Inject(DETECTION_PROVIDER_KEY)
    private detectionService: IDetectionProvider,
  ) {}

  @GrpcMethod('DetectionService')
  async DetectImages(
    data: IDetectImagesRequest,
  ): Promise<IDetectImagesResponse> {
    return this.detectionService.detectLabelsInImages(data);
  }
}
