import {
  type DetectImagesRequest,
  type DetectImagesResponse,
} from '../proto/detection';

export const DETECTION_PROVIDER_KEY = 'DETECTION_PROVIDER_KEY';

export interface IDetectionProvider {
  detectLabelsInImages(
    images: DetectImagesRequest,
  ): Promise<DetectImagesResponse>;
}
