import { DetectionObject } from '../enums/detection-object.enum';

export type IImageDetectionResultForTest = Record<
  DetectionObject,
  {
    count: number;
  }
>;
