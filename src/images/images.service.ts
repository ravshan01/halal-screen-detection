import * as sharp from 'sharp';

import { Injectable } from '@nestjs/common';

import { IImagesProvider } from './images.provider';
import { IImageMetadata } from './types/image-metadata.type';

@Injectable()
export class ImagesService implements IImagesProvider {
  async getMetadata(
    image:
      | Buffer
      | ArrayBuffer
      | Uint8Array
      | Uint8ClampedArray
      | Int8Array
      | Uint16Array
      | Int16Array
      | Uint32Array
      | Int32Array
      | Float32Array
      | Float64Array
      | string,
  ) {
    const metadata = await sharp(image).metadata();

    return {
      format: metadata.format,
      size: metadata.size,
      width: metadata.width,
      height: metadata.height,
    } satisfies IImageMetadata;
  }
}
