import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'detection',
        protoPath: join(__dirname, 'proto/detection.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
