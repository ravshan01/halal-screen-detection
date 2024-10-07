import {
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
  type Image as IImage,
  type ImageDetections as IImageDetections,
} from '../proto/detection';

export const DETECTION_VALIDATOR_KEY = 'DETECTION_VALIDATOR_KEY';

export interface IDetectionValidator {
  validateImagesCount(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;
  validateImagesExists(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;
  validateImagesLimit(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;

  validateImage(image: IImage): IDetectionValidationResult<IImageDetections>;
  validateImageContent(
    image: IImage,
  ): IDetectionValidationResult<IImageDetections>;
  validateImageSize(
    image: IImage,
  ): IDetectionValidationResult<IImageDetections>;
}

export interface IDetectionValidationResult<
  ResType extends object = IDetectImagesResponse,
> {
  success: boolean;
  resWithErr: ResType | null;
}
