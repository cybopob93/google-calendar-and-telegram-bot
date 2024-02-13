import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { GoogleCalendarService } from './google.calendar.service';

@Controller('google.calendar')
export class GoogleCalendarController {
  constructor(private googleCalendarService: GoogleCalendarService) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  createEvent() {
    console.log('123');
  }

  @Get('/oauth')
  async saveOauthData(@Query('code') authorizationCode: string) {
    await this.googleCalendarService.saveUserToken(authorizationCode);
    return 'Вы успешно авторизованы, пожалуйста закройте данную вкладку';
  }

  @Get('/auth-url')
  generateAuthUrl() {
    return this.googleCalendarService.generateAuthUrl();
  }
}
