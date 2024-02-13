import { Test, TestingModule } from '@nestjs/testing';
import { ToastController } from './toast.controller';

describe('ToastController', () => {
  let controller: ToastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToastController],
    }).compile();

    controller = module.get<ToastController>(ToastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
