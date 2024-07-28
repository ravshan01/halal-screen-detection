import { join } from 'node:path';

import { PERSON_IMAGE_DETECTION_RESULT_FOR_TEST } from './person.detection-result';
import { ROOM_IMAGE_DETECTION_RESULT_FOR_TEST } from './room.detection-result';
import { STREET_IMAGE_DETECTION_RESULT_FOR_TEST } from './street.detection-result';
import { TRAFFIC_IMAGE_DETECTION_RESULT_FOR_TEST } from './traffic.detection-result';

export const DETECTION_IMAGES_WITH_RESULT_FOR_TEST = [
  {
    path: join(__dirname, './person.jpg'),
    result: PERSON_IMAGE_DETECTION_RESULT_FOR_TEST,
  },
  {
    path: join(__dirname, './room.jpg'),
    result: ROOM_IMAGE_DETECTION_RESULT_FOR_TEST,
  },
  {
    path: join(__dirname, './street.jpg'),
    result: STREET_IMAGE_DETECTION_RESULT_FOR_TEST,
  },
  {
    path: join(__dirname, './traffic.jpg'),
    result: TRAFFIC_IMAGE_DETECTION_RESULT_FOR_TEST,
  },
];
