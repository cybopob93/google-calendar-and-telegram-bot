import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google.calendar.service';
import { GoogleCalendarController } from './google.calendar.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarController],
})
export class GoogleCalendarModule {}
