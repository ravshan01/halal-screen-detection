import { IDetection } from './types/detection.types';

export interface IDetectionService {
  detectLabelsInImage(imageBytes: Buffer): Promise<IDetection[]>;
}
