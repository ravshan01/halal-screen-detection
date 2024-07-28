import { IDetection } from './types/detection.types';

export interface IDetectionService {
  detectLabelsInImages(images: Buffer[]): Promise<Array<IDetection[]>>;
}
