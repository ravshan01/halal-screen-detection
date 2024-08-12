import { Module } from '@nestjs/common';

import { ImagesModule } from '../images/images.module';
import { DETECTION_SERVICE_KEY } from './constants/di-keys.constants';
import { DetectionController } from './detection.controller';
import { DetectionService } from './detection.service';

@Module({
  imports: [ImagesModule],
  controllers: [DetectionController],
  providers: [
    {
      provide: DETECTION_SERVICE_KEY,
      useClass: DetectionService,
    },
  ],
})
export class DetectionModule {}
