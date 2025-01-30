import { Test, TestingModule } from '@nestjs/testing';
import { CombiController } from './combi.controller';

describe('CombiController', () => {
  let controller: CombiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombiController],
    }).compile();

    controller = module.get<CombiController>(CombiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
