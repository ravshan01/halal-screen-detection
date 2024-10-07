import {
  type DetectImagesRequest as IDetectImagesRequest,
  type DetectImagesResponse as IDetectImagesResponse,
  type Image as IImage,
  type ImageDetections as IImageDetections,
} from '../proto/detection';

export const DETECTION_VALIDATOR_KEY = 'DETECTION_VALIDATOR_KEY';

export interface IDetectionValidator {
  validateRequestOnHasImagesOrTooMany(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;
  validateRequestOnHasImages(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;
  validateRequestOnHasTooManyImages(
    request: IDetectImagesRequest,
  ): IDetectionValidationResult;

  validateImageOnValidityOrMaxSize(
    image: IImage,
  ): IDetectionValidationResult<IImageDetections>;

  validateImageOnValidity(
    image: IImage,
  ): IDetectionValidationResult<IImageDetections>;
  validateImageONMaxSize(
    image: IImage,
  ): IDetectionValidationResult<IImageDetections>;
}

export interface IDetectionValidationResult<
  ResType extends object = IDetectImagesResponse,
> {
  success: boolean;
  resWithErr: ResType | null;
}
