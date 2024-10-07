import {
  BoundingBox,
  DetectLabelsCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvVariables } from '../config/types/env-variables.type';
import { IMAGES_SERVICE_KEY, IImagesService } from '../images/images.provider';
import { IImageMetadata } from '../images/types/image-metadata.type';
import {
  DetectionObject,
  type DetectImagesRequest,
  type DetectImagesResponse,
  type Detection,
  type Image,
  type ImageDetections,
} from '../proto/detection';
import { IDetectionService } from './detection.provider';

@Injectable()
export class DetectionService implements IDetectionService {
  private rekognitionClient: RekognitionClient;

  constructor(
    private readonly configService: ConfigService<IEnvVariables>,
    @Inject(IMAGES_SERVICE_KEY)
    private readonly imagesService: IImagesService,
  ) {
    this.rekognitionClient = new RekognitionClient({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        // sessionToken: configService.get('AWS_SESSION_TOKEN'),
      },
    });
  }

  async detectLabelsInImages(
    request: DetectImagesRequest,
  ): Promise<DetectImagesResponse> {
    const detections = await Promise.all(
      request.images.map((image) => this.detectLabelsInImage(image)),
    );

    return { detections };
  }

  // TODO: check image.content type
  // TODO: add error handling
  private async detectLabelsInImage(image: Image): Promise<ImageDetections> {
    const command = new DetectLabelsCommand({
      Image: {
        Bytes: image.content,
      },
      Settings: {
        GeneralLabels: {
          LabelInclusionFilters: ['Person'],
        },
      },
    });

    try {
      const response = await this.rekognitionClient.send(command);
      const imageMetadata = await this.imagesService.getMetadata(image.content);

      const detections = response.Labels[0].Instances.map<Detection>(
        (instance) => ({
          object: DetectionObject.Person,
          score: instance.Confidence,
          coords: this.boundingBox2DetectionCoords(
            instance.BoundingBox,
            imageMetadata,
          ),
        }),
      );

      return { detections };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to detect labels in the image.');
    }
  }

  /**
   * The AWS Rekognition BoundingBox contains a percentage value relative to the width or height of the image
   * <br>
   * BoundingBox example
   * ```json
   * {
   *    "Height": 0.6601227521896362,
   *    "Left": 0.5589394569396973,
   *    "Top": 0.27017539739608765,
   *    "Width": 0.367832213640213
   * }
   * ```
   */
  private boundingBox2DetectionCoords(
    box: BoundingBox,
    metadata: IImageMetadata,
  ): Detection['coords'] {
    return {
      x: box.Left * metadata.width,
      y: box.Top * metadata.height,
      width: box.Width * metadata.width,
      height: box.Height * metadata.height,
    };
  }
}
