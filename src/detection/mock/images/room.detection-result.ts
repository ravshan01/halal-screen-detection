import { DetectionObject } from '../../../proto/detection';
import { IImageDetectionResultForTest } from '../image-detection-result-for-test.type';

export const ROOM_IMAGE_DETECTION_RESULT_FOR_TEST: IImageDetectionResultForTest =
  {
    [DetectionObject.Person]: {
      count: 4,
    },
  };
