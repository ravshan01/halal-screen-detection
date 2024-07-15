import { Test, TestingModule } from '@nestjs/testing';
import { DetectionService } from './detection.service';
import { ConfigModule } from '@nestjs/config';

describe('DetectionService', () => {
  let service: DetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test', '.env.test.local'],
        }),
      ],
      providers: [DetectionService],
    }).compile();

    service = module.get<DetectionService>(DetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect labels in an image', async () => {
    const imageBytes = Buffer.from('image bytes');
    const labels = await service.detectLabelsInImage(imageBytes);
    expect(labels).toBeDefined();
  });
});
