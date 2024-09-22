import { join } from 'node:path';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { IEnvironmentVariables } from './config/types/environment-variables.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IEnvironmentVariables>);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'detection',
      protoPath: join(__dirname, 'proto/detection.proto'),
      url: `localhost:${configService.get<number>('PORT')}`,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
