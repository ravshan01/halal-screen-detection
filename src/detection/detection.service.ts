import { Injectable } from '@nestjs/common';
import {
  DetectLabelsCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/types/environment-variables.type';
import { IDetectionService } from './detection.service.type';

@Injectable()
export class DetectionService implements IDetectionService {
  private rekognitionClient: RekognitionClient;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.rekognitionClient = new RekognitionClient({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async detectLabelsInImage(imageBytes: Buffer) {
    const command = new DetectLabelsCommand({
      Image: {
        Bytes: imageBytes,
      },
    });

    try {
      const response = await this.rekognitionClient.send(command);
      console.log(response);
      return response.Labels;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to detect labels in the image.');
    }
  }
}
