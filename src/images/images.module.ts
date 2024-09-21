import { Module } from '@nestjs/common';

import { IMAGES_PROVIDER_KEY } from './images.provider';
import { ImagesService } from './images.service';

@Module({
  providers: [
    {
      provide: IMAGES_PROVIDER_KEY,
      useClass: ImagesService,
    },
  ],
  controllers: [],
  exports: [IMAGES_PROVIDER_KEY],
})
export class ImagesModule {}
