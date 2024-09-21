import { Module } from '@nestjs/common';

import { ImagesModule } from '../images/images.module';
import { DetectionController } from './detection.controller';
import { DETECTION_PROVIDER_KEY } from './detection.provider';
import { DetectionService } from './detection.service';

@Module({
  imports: [ImagesModule],
  controllers: [DetectionController],
  providers: [
    {
      provide: DETECTION_PROVIDER_KEY,
      useClass: DetectionService,
    },
  ],
})
export class DetectionModule {}
