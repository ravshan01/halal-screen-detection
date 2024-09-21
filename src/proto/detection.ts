/* eslint-disable */
// @generated by protobuf-ts 2.9.4 with parameter eslint_disable
// @generated from protobuf file "detection.proto" (package "detection", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from '@protobuf-ts/runtime';
import type { IBinaryWriter } from '@protobuf-ts/runtime';
import { WireType } from '@protobuf-ts/runtime';
import type { BinaryReadOptions } from '@protobuf-ts/runtime';
import type { IBinaryReader } from '@protobuf-ts/runtime';
import { UnknownFieldHandler } from '@protobuf-ts/runtime';
import type { PartialMessage } from '@protobuf-ts/runtime';
import { reflectionMergePartial } from '@protobuf-ts/runtime';
import { MessageType } from '@protobuf-ts/runtime';
import { ServiceType } from '@protobuf-ts/runtime-rpc';

/**
 * @generated from protobuf message detection.DetectImagesRequest
 */
export interface DetectImagesRequest {
  /**
   * @generated from protobuf field: repeated detection.Image images = 1;
   */
  images: Image[];
}
/**
 * @generated from protobuf message detection.DetectImagesResponse
 */
export interface DetectImagesResponse {
  /**
   * @generated from protobuf field: repeated detection.ImageDetections detections = 1;
   */
  detections: ImageDetections[];
  /**
   * @generated from protobuf field: detection.Error error = 2;
   */
  error?: Error;
}
// message DetectVideoRequest {
//  Video video = 1;
// }
// message DetectVideoResponse {
//  VideoDetections detections = 1;
//  Error error = 2;
// }

/**
 * @generated from protobuf message detection.Image
 */
export interface Image {
  /**
   * @generated from protobuf field: bytes content = 2;
   */
  content: Uint8Array;
}
/**
 * @generated from protobuf message detection.ImageDetections
 */
export interface ImageDetections {
  /**
   * @generated from protobuf field: repeated detection.Detection detections = 2;
   */
  detections: Detection[];
}
// message Video {
//  bytes content = 2;
// }
// message VideoDetections {
//  repeated ImageDetections detections = 2;
// }

/**
 * @generated from protobuf message detection.Detection
 */
export interface Detection {
  /**
   * @generated from protobuf field: detection.DetectionObject object = 1;
   */
  object: DetectionObject;
  /**
   * @generated from protobuf field: float score = 2;
   */
  score: number;
  /**
   * @generated from protobuf field: detection.Detection.Coords coords = 3;
   */
  coords?: Detection_Coords;
}
/**
 * Detection box coordinates in pixels
 *
 * @generated from protobuf message detection.Detection.Coords
 */
export interface Detection_Coords {
  /**
   * @generated from protobuf field: float x = 1;
   */
  x: number;
  /**
   * @generated from protobuf field: float y = 2;
   */
  y: number;
  /**
   * @generated from protobuf field: float width = 3;
   */
  width: number;
  /**
   * @generated from protobuf field: float height = 4;
   */
  height: number;
}
/**
 * @generated from protobuf message detection.Error
 */
export interface Error {
  /**
   * @generated from protobuf field: int32 code = 1;
   */
  code: number;
  /**
   * @generated from protobuf field: string message = 2;
   */
  message: string;
}
/**
 * @generated from protobuf enum detection.DetectionObject
 */
export enum DetectionObject {
  /**
   * @generated from protobuf enum value: Person = 0;
   */
  Person = 0,
}
// @generated message type with reflection information, may provide speed optimized methods
class DetectImagesRequest$Type extends MessageType<DetectImagesRequest> {
  constructor() {
    super('detection.DetectImagesRequest', [
      {
        no: 1,
        name: 'images',
        kind: 'message',
        repeat: 1 /*RepeatType.PACKED*/,
        T: () => Image,
      },
    ]);
  }
  create(value?: PartialMessage<DetectImagesRequest>): DetectImagesRequest {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.images = [];
    if (value !== undefined)
      reflectionMergePartial<DetectImagesRequest>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: DetectImagesRequest,
  ): DetectImagesRequest {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* repeated detection.Image images */ 1:
          message.images.push(
            Image.internalBinaryRead(reader, reader.uint32(), options),
          );
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: DetectImagesRequest,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* repeated detection.Image images = 1; */
    for (let i = 0; i < message.images.length; i++)
      Image.internalBinaryWrite(
        message.images[i],
        writer.tag(1, WireType.LengthDelimited).fork(),
        options,
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.DetectImagesRequest
 */
export const DetectImagesRequest = new DetectImagesRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DetectImagesResponse$Type extends MessageType<DetectImagesResponse> {
  constructor() {
    super('detection.DetectImagesResponse', [
      {
        no: 1,
        name: 'detections',
        kind: 'message',
        repeat: 1 /*RepeatType.PACKED*/,
        T: () => ImageDetections,
      },
      { no: 2, name: 'error', kind: 'message', T: () => Error },
    ]);
  }
  create(value?: PartialMessage<DetectImagesResponse>): DetectImagesResponse {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.detections = [];
    if (value !== undefined)
      reflectionMergePartial<DetectImagesResponse>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: DetectImagesResponse,
  ): DetectImagesResponse {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* repeated detection.ImageDetections detections */ 1:
          message.detections.push(
            ImageDetections.internalBinaryRead(
              reader,
              reader.uint32(),
              options,
            ),
          );
          break;
        case /* detection.Error error */ 2:
          message.error = Error.internalBinaryRead(
            reader,
            reader.uint32(),
            options,
            message.error,
          );
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: DetectImagesResponse,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* repeated detection.ImageDetections detections = 1; */
    for (let i = 0; i < message.detections.length; i++)
      ImageDetections.internalBinaryWrite(
        message.detections[i],
        writer.tag(1, WireType.LengthDelimited).fork(),
        options,
      ).join();
    /* detection.Error error = 2; */
    if (message.error)
      Error.internalBinaryWrite(
        message.error,
        writer.tag(2, WireType.LengthDelimited).fork(),
        options,
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.DetectImagesResponse
 */
export const DetectImagesResponse = new DetectImagesResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Image$Type extends MessageType<Image> {
  constructor() {
    super('detection.Image', [
      { no: 2, name: 'content', kind: 'scalar', T: 12 /*ScalarType.BYTES*/ },
    ]);
  }
  create(value?: PartialMessage<Image>): Image {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.content = new Uint8Array(0);
    if (value !== undefined)
      reflectionMergePartial<Image>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: Image,
  ): Image {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* bytes content */ 2:
          message.content = reader.bytes();
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: Image,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* bytes content = 2; */
    if (message.content.length)
      writer.tag(2, WireType.LengthDelimited).bytes(message.content);
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.Image
 */
export const Image = new Image$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ImageDetections$Type extends MessageType<ImageDetections> {
  constructor() {
    super('detection.ImageDetections', [
      {
        no: 2,
        name: 'detections',
        kind: 'message',
        repeat: 1 /*RepeatType.PACKED*/,
        T: () => Detection,
      },
    ]);
  }
  create(value?: PartialMessage<ImageDetections>): ImageDetections {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.detections = [];
    if (value !== undefined)
      reflectionMergePartial<ImageDetections>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: ImageDetections,
  ): ImageDetections {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* repeated detection.Detection detections */ 2:
          message.detections.push(
            Detection.internalBinaryRead(reader, reader.uint32(), options),
          );
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: ImageDetections,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* repeated detection.Detection detections = 2; */
    for (let i = 0; i < message.detections.length; i++)
      Detection.internalBinaryWrite(
        message.detections[i],
        writer.tag(2, WireType.LengthDelimited).fork(),
        options,
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.ImageDetections
 */
export const ImageDetections = new ImageDetections$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Detection$Type extends MessageType<Detection> {
  constructor() {
    super('detection.Detection', [
      {
        no: 1,
        name: 'object',
        kind: 'enum',
        T: () => ['detection.DetectionObject', DetectionObject],
      },
      { no: 2, name: 'score', kind: 'scalar', T: 2 /*ScalarType.FLOAT*/ },
      { no: 3, name: 'coords', kind: 'message', T: () => Detection_Coords },
    ]);
  }
  create(value?: PartialMessage<Detection>): Detection {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.object = 0;
    message.score = 0;
    if (value !== undefined)
      reflectionMergePartial<Detection>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: Detection,
  ): Detection {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* detection.DetectionObject object */ 1:
          message.object = reader.int32();
          break;
        case /* float score */ 2:
          message.score = reader.float();
          break;
        case /* detection.Detection.Coords coords */ 3:
          message.coords = Detection_Coords.internalBinaryRead(
            reader,
            reader.uint32(),
            options,
            message.coords,
          );
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: Detection,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* detection.DetectionObject object = 1; */
    if (message.object !== 0)
      writer.tag(1, WireType.Varint).int32(message.object);
    /* float score = 2; */
    if (message.score !== 0) writer.tag(2, WireType.Bit32).float(message.score);
    /* detection.Detection.Coords coords = 3; */
    if (message.coords)
      Detection_Coords.internalBinaryWrite(
        message.coords,
        writer.tag(3, WireType.LengthDelimited).fork(),
        options,
      ).join();
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.Detection
 */
export const Detection = new Detection$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Detection_Coords$Type extends MessageType<Detection_Coords> {
  constructor() {
    super('detection.Detection.Coords', [
      { no: 1, name: 'x', kind: 'scalar', T: 2 /*ScalarType.FLOAT*/ },
      { no: 2, name: 'y', kind: 'scalar', T: 2 /*ScalarType.FLOAT*/ },
      { no: 3, name: 'width', kind: 'scalar', T: 2 /*ScalarType.FLOAT*/ },
      { no: 4, name: 'height', kind: 'scalar', T: 2 /*ScalarType.FLOAT*/ },
    ]);
  }
  create(value?: PartialMessage<Detection_Coords>): Detection_Coords {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.x = 0;
    message.y = 0;
    message.width = 0;
    message.height = 0;
    if (value !== undefined)
      reflectionMergePartial<Detection_Coords>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: Detection_Coords,
  ): Detection_Coords {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* float x */ 1:
          message.x = reader.float();
          break;
        case /* float y */ 2:
          message.y = reader.float();
          break;
        case /* float width */ 3:
          message.width = reader.float();
          break;
        case /* float height */ 4:
          message.height = reader.float();
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: Detection_Coords,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* float x = 1; */
    if (message.x !== 0) writer.tag(1, WireType.Bit32).float(message.x);
    /* float y = 2; */
    if (message.y !== 0) writer.tag(2, WireType.Bit32).float(message.y);
    /* float width = 3; */
    if (message.width !== 0) writer.tag(3, WireType.Bit32).float(message.width);
    /* float height = 4; */
    if (message.height !== 0)
      writer.tag(4, WireType.Bit32).float(message.height);
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.Detection.Coords
 */
export const Detection_Coords = new Detection_Coords$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Error$Type extends MessageType<Error> {
  constructor() {
    super('detection.Error', [
      { no: 1, name: 'code', kind: 'scalar', T: 5 /*ScalarType.INT32*/ },
      { no: 2, name: 'message', kind: 'scalar', T: 9 /*ScalarType.STRING*/ },
    ]);
  }
  create(value?: PartialMessage<Error>): Error {
    const message = globalThis.Object.create(this.messagePrototype!);
    message.code = 0;
    message.message = '';
    if (value !== undefined)
      reflectionMergePartial<Error>(this, message, value);
    return message;
  }
  internalBinaryRead(
    reader: IBinaryReader,
    length: number,
    options: BinaryReadOptions,
    target?: Error,
  ): Error {
    let message = target ?? this.create(),
      end = reader.pos + length;
    while (reader.pos < end) {
      let [fieldNo, wireType] = reader.tag();
      switch (fieldNo) {
        case /* int32 code */ 1:
          message.code = reader.int32();
          break;
        case /* string message */ 2:
          message.message = reader.string();
          break;
        default:
          let u = options.readUnknownField;
          if (u === 'throw')
            throw new globalThis.Error(
              `Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`,
            );
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(
              this.typeName,
              message,
              fieldNo,
              wireType,
              d,
            );
      }
    }
    return message;
  }
  internalBinaryWrite(
    message: Error,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): IBinaryWriter {
    /* int32 code = 1; */
    if (message.code !== 0) writer.tag(1, WireType.Varint).int32(message.code);
    /* string message = 2; */
    if (message.message !== '')
      writer.tag(2, WireType.LengthDelimited).string(message.message);
    let u = options.writeUnknownFields;
    if (u !== false)
      (u == true ? UnknownFieldHandler.onWrite : u)(
        this.typeName,
        message,
        writer,
      );
    return writer;
  }
}
/**
 * @generated MessageType for protobuf message detection.Error
 */
export const Error = new Error$Type();
/**
 * @generated ServiceType for protobuf service detection.DetectionService
 */
export const DetectionService = new ServiceType('detection.DetectionService', [
  {
    name: 'DetectImages',
    options: {},
    I: DetectImagesRequest,
    O: DetectImagesResponse,
  },
]);
