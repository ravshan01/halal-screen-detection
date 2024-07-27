import { Injectable } from '@nestjs/common';
import { IImagesService } from './images.service.type';
import * as sharp from 'sharp';

@Injectable()
export class ImagesService implements IImagesService {
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
    };
  }
}
