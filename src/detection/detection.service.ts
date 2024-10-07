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
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
  type Detection as IDetection,
  type Image as IImage,
  Detection,
  Detection_Coords,
  ImageDetections,
  ImageDetections_Error,
  ImageDetections_ErrorCode,
  DetectImagesResponse,
  DetectError,
  DetectErrorCode,
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

  async DetectLabelsInImages(request: IDetectImagesRequest) {
    const validationResult = this.checkHasImagesAndNotTooMany(request.images);
    if (!validationResult.success) return validationResult.resWithErr;

    const detections = await Promise.all(
      request.images.map((image) => this.detectLabelsInImage(image)),
    );

    return DetectImagesResponse.create({ detections });
  }

  private async detectLabelsInImage(image: IImage) {
    const isValidImage = await this.imagesService.checkIsValidImage(
      image.content,
    );
    if (!isValidImage)
      return ImageDetections.create({
        error: ImageDetections_Error.create({
          code: ImageDetections_ErrorCode.InvalidImage,
        }),
      });
    // TODO: check max image size

    try {
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

      const response = await this.rekognitionClient.send(command);
      const imageMetadata = await this.imagesService.getMetadata(image.content);

      const detections = response.Labels[0].Instances.map<IDetection>(
        (instance) =>
          Detection.create({
            object: DetectionObject.Person,
            score: instance.Confidence,
            coords: this.boundingBox2DetectionCoords(
              instance.BoundingBox,
              imageMetadata,
            ),
          }),
      );

      return ImageDetections.create({ detections });
    } catch (error) {
      console.error(error);

      return ImageDetections.create({
        error: ImageDetections_Error.create({
          code: ImageDetections_ErrorCode.InternalError,
          message: 'Failed to detect labels in the image.',
        }),
      });
    }
  }

  private checkHasImagesAndNotTooMany(images: IImage[]): IValidationResult {
    const hasImageResult = this.checkHasImages(images);
    if (!hasImageResult.success) return hasImageResult;

    const tooManyImagesResult = this.checkNotTooManyImages(images);
    if (!tooManyImagesResult.success) return tooManyImagesResult;

    return { success: true };
  }

  private checkHasImages(images: IImage[]): IValidationResult {
    if (!images || images.length === 0)
      return {
        success: false,
        resWithErr: DetectImagesResponse.create({
          error: DetectError.create({
            code: DetectErrorCode.BadRequest,
            message: 'No images provided',
          }),
        }),
      };

    return { success: true };
  }
  private checkNotTooManyImages(images: IImage[]): IValidationResult {
    if (images.length > this.configService.get('MAX_IMAGES_PER_REQUEST'))
      return {
        success: false,
        resWithErr: DetectImagesResponse.create({
          error: DetectError.create({
            code: DetectErrorCode.MaxImagesExceeded,
            message: 'Too many images provided',
          }),
        }),
      };

    return { success: true };
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
  ) {
    return Detection_Coords.create({
      x: box.Left * metadata.width,
      y: box.Top * metadata.height,
      width: box.Width * metadata.width,
      height: box.Height * metadata.height,
    });
  }
}

interface IValidationResult {
  success: boolean;
  resWithErr?: IDetectImagesResponse;
}
