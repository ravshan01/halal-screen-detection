import * as fs from 'node:fs';
import { join } from 'node:path';

import { Test, TestingModule } from '@nestjs/testing';

import { ImagesService } from './images.service';
import { IMAGES_MOCK_IMAGE_METADATA } from './mock/image.metadata';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkIsValidImage', () => {
    it('should return true if image is valid', async () => {
      const imagePath = join(__dirname, 'mock/image.jpg');
      const buffer = await fs.promises.readFile(imagePath);
      const isValid = await service.checkIsValidImage(buffer);

      expect(isValid).toBe(true);
    });

    it('should return false if image is invalid', async () => {
      const buffer = Buffer.from('invalid image');
      const isValid = await service.checkIsValidImage(buffer);

      expect(isValid).toBe(false);
    });
  });

  describe('getMetadata', () => {
    describe('should get metadata of an image', () => {
      const imagePath = join(__dirname, 'mock/image.jpg');

      it('buffer', async () => {
        const buffer = await fs.promises.readFile(imagePath);
        const metadata = await service.getMetadata(buffer);
        console.log(metadata);

        expect(metadata).toBeDefined();
        expect(metadata.format).toBe(IMAGES_MOCK_IMAGE_METADATA.format);
        expect(metadata.size).toBe(IMAGES_MOCK_IMAGE_METADATA.size);
        expect(metadata.width).toBe(IMAGES_MOCK_IMAGE_METADATA.width);
        expect(metadata.height).toBe(IMAGES_MOCK_IMAGE_METADATA.height);
      });

      it('path', async () => {
        const metadata = await service.getMetadata(imagePath);

        expect(metadata).toBeDefined();
        expect(metadata.format).toBe(IMAGES_MOCK_IMAGE_METADATA.format);
        expect(metadata.width).toBe(IMAGES_MOCK_IMAGE_METADATA.width);
        expect(metadata.height).toBe(IMAGES_MOCK_IMAGE_METADATA.height);
      });
    });

    describe('should throw an error', () => {
      it('if image is invalid', async () => {
        const buffer = Buffer.from('invalid image');
        await expect(service.getMetadata(buffer)).rejects.toThrow();
      });

      it('if image is not found', async () => {
        const imagePath = join(__dirname, 'mock/not-found.jpg');
        await expect(service.getMetadata(imagePath)).rejects.toThrow();
      });
    });
  });
});
