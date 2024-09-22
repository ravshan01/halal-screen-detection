import { Module } from '@nestjs/common';

import { IMAGES_SERVICE_KEY } from './images.provider';
import { ImagesService } from './images.service';

@Module({
  providers: [
    {
      provide: IMAGES_SERVICE_KEY,
      useClass: ImagesService,
    },
  ],
  controllers: [],
  exports: [IMAGES_SERVICE_KEY],
})
export class ImagesModule {}
