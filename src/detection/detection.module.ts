import { Module } from '@nestjs/common';

import { ImagesModule } from '../images/images.module';
import { DETECTION_SERVICE_KEY } from './detection.provider';
import { DetectionService } from './detection.service';

@Module({
  imports: [ImagesModule],
  controllers: [],
  providers: [
    {
      provide: DETECTION_SERVICE_KEY,
      useClass: DetectionService,
    },
  ],
  exports: [DETECTION_SERVICE_KEY],
})
export class DetectionModule {}
