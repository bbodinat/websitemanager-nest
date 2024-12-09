import { Test, TestingModule } from '@nestjs/testing';
import { GatsiaService } from './gatsia.service';

describe('GatsiaService', () => {
  let service: GatsiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatsiaService],
    }).compile();

    service = module.get<GatsiaService>(GatsiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
