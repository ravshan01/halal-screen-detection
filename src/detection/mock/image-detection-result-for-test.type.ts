import { DetectionObject } from '../../proto/detection';

export type IImageDetectionResultForTest = Record<
  DetectionObject,
  {
    count: number | { min: number; max: number };
  }
>;
