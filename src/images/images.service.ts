import * as sharp from 'sharp';

import { Injectable } from '@nestjs/common';

import { IImagesService } from './images.provider';
import { IImageMetadata } from './types/image-metadata.type';

@Injectable()
export class ImagesService implements IImagesService {
  async checkIsValidImage(image: Buffer | Uint8Array): Promise<boolean> {
    try {
      await sharp(image).metadata();
      return true;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Input buffer contains unsupported image format')
      )
        return false;

      throw error;
    }
  }

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
