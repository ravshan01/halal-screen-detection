import { DetectionObject } from '../../enums/detection-object.enum';
import { IImageDetectionResultForTest } from '../image-detection-result-for-test.type';

export const PERSON_IMAGE_DETECTION_RESULT_FOR_TEST: IImageDetectionResultForTest =
  {
    [DetectionObject.Person]: {
      count: 1,
    },
  };
