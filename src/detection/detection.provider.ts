import {
  type DetectImagesRequest,
  type DetectImagesResponse,
} from '../proto/detection';

export const DETECTION_SERVICE_KEY = 'DETECTION_SERVICE_KEY';

export interface IDetectionService {
  detectLabelsInImages(
    images: DetectImagesRequest,
  ): Promise<DetectImagesResponse>;
}
