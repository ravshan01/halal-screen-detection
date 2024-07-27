import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { IMAGES_SERVICE_KEY } from './constants/di-keys.constants';

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
