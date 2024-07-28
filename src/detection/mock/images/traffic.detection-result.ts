import { DetectionObject } from '../../enums/detection-object.enum';
import { IImageDetectionResultForTest } from '../image-detection-result-for-test.type';

export const TRAFFIC_IMAGE_DETECTION_RESULT_FOR_TEST: IImageDetectionResultForTest =
  {
    [DetectionObject.Person]: {
      count: { min: 5, max: 6 },
    },
  };
