import { Test, TestingModule } from '@nestjs/testing';
import { CombiService } from './combi.service';

describe('CombiService', () => {
  let service: CombiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombiService],
    }).compile();

    service = module.get<CombiService>(CombiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
