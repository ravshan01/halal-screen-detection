export interface IDetectionService {
  detectLabelsInImage(imageBytes: Buffer): Promise<any>;
}
