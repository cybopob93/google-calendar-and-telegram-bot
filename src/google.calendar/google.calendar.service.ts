import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { ConfigService } from '../common/config.service';

@Injectable()
export class GoogleCalendarService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/calendar'];

  constructor(private config: ConfigService) {}

  private getOAuthClient(): Auth.OAuth2Client {
    return new google.auth.OAuth2({
      clientId: this.config.get('GOOGLE_YOUR_CLIENT_ID'),
      clientSecret: this.config.get('GOOGLE_YOUR_CLIENT_SECRET'),
      redirectUri: this.config.get('GOOGLE_YOUR_REDIRECT_URL'),
    });
  }

  generateAuthUrl() {
    return this.getOAuthClient().generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
    });
  }

  async saveUserToken(authorizationCode: string) {
    const oAuthClient = this.getOAuthClient();
    const { tokens } = await oAuthClient.getToken(authorizationCode);
    oAuthClient.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oAuthClient });
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }
    console.log('Upcoming 10 events:');
    events.map((event) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  }
}
