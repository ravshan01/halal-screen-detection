import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
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
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
