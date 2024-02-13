import { Test, TestingModule } from '@nestjs/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToastService],
    }).compile();

    service = module.get<ToastService>(ToastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
