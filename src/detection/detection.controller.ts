import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { DetectImagesRequest, DetectImagesResponse } from '../proto/detection';

@Controller()
export class DetectionController {
  @GrpcMethod('DetectionService')
  DetectImages(
    data: DetectImagesRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): DetectImagesResponse {
    console.log({
      data,
      metadata,
      call,
    });

    return new DetectImagesResponse({
      detections: [],
    });
  }
}
