import { DetectionObject } from '../../../proto/detection';
import { IImageDetectionResultForTest } from '../image-detection-result-for-test.type';

export const STREET_IMAGE_DETECTION_RESULT_FOR_TEST: IImageDetectionResultForTest =
  {
    [DetectionObject.Person]: {
      count: {
        min: 3,
        max: 4,
      },
    },
  };
