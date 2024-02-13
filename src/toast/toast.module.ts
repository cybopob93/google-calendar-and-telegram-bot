import { Module } from '@nestjs/common';
import { ToastController } from './toast.controller';
import { ToastService } from './toast.service';

@Module({
  controllers: [ToastController],
  providers: [ToastService],
})
export class ToastModule {}
