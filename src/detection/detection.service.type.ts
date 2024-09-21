import { IDetection } from './types/detection.types';

export interface IDetectionService {
  detectLabelsInImages(
    images: (Buffer | Uint8Array)[],
  ): Promise<Array<IDetection[]>>;
}
