import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
} from '../proto/detection';
import { DETECTION_SERVICE_KEY } from './constants/di-keys.constants';
import { IDetectionService } from './detection.service.type';

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
    return this.detectionService.detectLabelsInImages(data);
  }
}
