import { Injectable } from '@nestjs/common';
import {
  DetectLabelsCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/types/environment-variables.type';
import { IDetectionService } from './detection.service.type';
import * as fs from 'node:fs';
import { join } from 'node:path';

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
        // sessionToken: configService.get('AWS_SESSION_TOKEN'),
      },
    });
  }

  async detectLabelsInImage(imageBytes: Buffer) {
    const command = new DetectLabelsCommand({
      Image: {
        Bytes: imageBytes,
      },
      Settings: {
        GeneralLabels: {
          LabelInclusionFilters: ['Person'],
        },
      },
    });

    try {
      const response = await this.rekognitionClient.send(command);
      const data = response.Labels[0].Instances.map((instance) => ({
        object: 'Person',
        score: instance.Confidence,
        x: instance.BoundingBox?.Left,
        y: instance.BoundingBox?.Top,
        width: instance.BoundingBox?.Width,
        height: instance.BoundingBox?.Height,
      }));

      // for test
      // await fs.promises.writeFile(
      //   join(__dirname, 'response.json'),
      //   JSON.stringify(response, null, 2),
      // );
      //
      // await fs.promises.writeFile(
      //   join(__dirname, 'data.json'),
      //   JSON.stringify(data, null, 2),
      // );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to detect labels in the image.');
    }
  }
}
