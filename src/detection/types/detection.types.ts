import { DetectionObject } from '../enums/detection-object.enum';

export interface IDetection {
  object: DetectionObject;
  /** float number */
  score: number;
  /** coords in pixels */
  coords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
