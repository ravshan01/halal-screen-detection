import {
  type DetectImagesRequest,
  type DetectImagesResponse,
} from '../proto/detection';

export interface IDetectionService {
  detectLabelsInImages(
    images: DetectImagesRequest,
  ): Promise<DetectImagesResponse>;
}
