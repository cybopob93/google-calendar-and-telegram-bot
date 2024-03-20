import { Module } from "@nestjs/common";
import { GoogleCalendarService } from "./google.calendar.service";
import { GoogleCalendarController } from "./google.calendar.controller";
import { CommonModule } from "../common/common.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [CommonModule, UserModule],
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarController],
})
export class GoogleCalendarModule {}
