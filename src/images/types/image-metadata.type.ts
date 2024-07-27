export interface IImageMetadata {
  /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
  format: string;
  /** Total size of image in bytes, for Stream and Buffer input only */
  size: number | undefined;
  /**  Number of pixels wide (EXIF orientation is not taken into consideration) */
  width: number;
  /** Number of pixels high (EXIF orientation is not taken into consideration) */
  height: number;
}
