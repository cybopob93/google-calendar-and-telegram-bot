import { Controller, Get, Put, Query, Redirect, Render } from '@nestjs/common';
import { GoogleCalendarService } from './google.calendar.service';

@Controller('google.calendar')
export class GoogleCalendarController {
  constructor(private googleCalendarService: GoogleCalendarService) {}

  @Get()
  @Render('googleAuthCallback')
  async showSuccessPage() {
    return {
      message:
        'Вы успешно авторизованы! Данная вкладка закроется автоматически через:',
      additionalMessage:
        'Если вкладка не закрылась автоматически, пожалуйста закройте ее сами :)',
      lang: 'ru',
    };
  }

  @Get('/oauth')
  @Redirect('/google.calendar', 302)
  async saveOauthData(@Query('code') authorizationCode: string) {
    await this.googleCalendarService.saveUserToken(authorizationCode);
  }

  @Get('/auth-url')
  generateAuthUrl() {
    return this.googleCalendarService.generateAuthUrl();
  }

  @Put('/add-event')
  addEventToCalendar(): Promise<any> {
    return this.googleCalendarService.addEventToCalendar();
  }
}
