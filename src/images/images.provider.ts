import { IImageMetadata } from './types/image-metadata.type';

export const IMAGES_PROVIDER_KEY = 'IMAGES_PROVIDER_KEY';

export interface ImagesProvider {
  getMetadata(
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
  ): Promise<IImageMetadata>;
}
