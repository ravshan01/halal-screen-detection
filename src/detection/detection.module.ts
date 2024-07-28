import { Module } from '@nestjs/common';

import { ImagesModule } from '../images/images.module';
import { DETECTION_SERVICE_KEY } from './constants/di-keys.constants';
import { DetectionService } from './detection.service';

@Module({
  imports: [ImagesModule],
  providers: [
    {
      provide: DETECTION_SERVICE_KEY,
      useClass: DetectionService,
    },
  ],
  controllers: [],
})
export class DetectionModule {}
