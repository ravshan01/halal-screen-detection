import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DetectionModule } from './detection/detection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`,
        '.env',
        '.env.local',
      ],

      isGlobal: true,
      cache: true,
    }),
    DetectionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
