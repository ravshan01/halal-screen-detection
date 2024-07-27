import { IImageMetadata } from './types/image-metadata.type';

export interface IImagesService {
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
