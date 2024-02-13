import { Module } from '@nestjs/common';
import { ToastModule } from './toast/toast.module';
import { CommonModule } from './common/common.module';
import { GoogleCalendarModule } from './google.calendar/google.calendar.module';

@Module({
  imports: [ToastModule, CommonModule, GoogleCalendarModule],
})
export class AppModule {}
