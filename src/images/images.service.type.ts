export interface IImagesService {
  getMetadata(
    imageBytes:
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
  ): Promise<{
    /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
    format: string;
    /** Total size of image in bytes, for Stream and Buffer input only */
    size: number;
    /**  Number of pixels wide (EXIF orientation is not taken into consideration) */
    width: number;
    /** Number of pixels high (EXIF orientation is not taken into consideration) */
    height: number;
  }>;
}
