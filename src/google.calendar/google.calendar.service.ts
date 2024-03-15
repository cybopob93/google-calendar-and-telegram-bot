import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { ConfigService } from '../common/config.service';
import { UserService } from '../user/user.service';
import { DateTime } from 'luxon';
import { User } from '../user/user.entity';

@Injectable()
export class GoogleCalendarService {
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/tasks',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {}

  private getOAuthClient(): Auth.OAuth2Client {
    return new google.auth.OAuth2({
      clientId: this.config.get('GOOGLE_YOUR_CLIENT_ID'),
      clientSecret: this.config.get('GOOGLE_YOUR_CLIENT_SECRET'),
      redirectUri: this.config.get('GOOGLE_YOUR_REDIRECT_URL'),
    });
  }

  private generateOAuthClient(user: User): Auth.OAuth2Client {
    const oAuthClient = this.getOAuthClient();
    oAuthClient.setCredentials(user.token);
    oAuthClient.on('tokens', (tokens) => {
      if (tokens) {
        user.token.access_token = tokens.access_token;
        user.token.scope = tokens.scope;
        user.token.token_type = tokens.token_type;
        user.token.expiry_date = tokens.expiry_date;
        this.userService
          .updateUser(user)
          .then(() => console.log('Token was updated'));
      }
    });
    return oAuthClient;
  }

  generateAuthUrl() {
    return this.getOAuthClient().generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
      include_granted_scopes: true,
    });
  }

  async saveUserToken(authorizationCode: string) {
    const oAuthClient = this.getOAuthClient();
    const { tokens } = await oAuthClient.getToken(authorizationCode);
    oAuthClient.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuthClient });
    const response = await oauth2.userinfo.get();
    const existUser = await this.userService.getByEmail(response.data.email);
    if (existUser) {
      existUser.token = tokens;
      await this.userService.updateUser(existUser);
    } else {
      await this.userService.create(response.data.email, tokens);
    }
  }

  async addEventToCalendar(): Promise<any> {
    const user = await this.userService.getById(
      '0b24f4c2-37f6-4bd3-ac64-9cfa48a8bebf',
    );
    const oAuthClient = this.generateOAuthClient(user);

    // try {
    //     const calendarApi = google.calendar({ version: 'v3', auth: oAuthClient });
    //   const result = await calendarApi.events.insert({
    //     calendarId: 'primary',
    //     requestBody: {
    //       summary: 'title',
    //       // location: 'location',
    //       description: 'description',
    //       start: {
    //         dateTime: DateTime.now()
    //           .plus({ day: 1 })
    //           .startOf('day')
    //           .plus({ hour: 14 })
    //           .setZone('Europe/Minsk')
    //           .toString(),
    //         timeZone: 'Europe/Minsk',
    //       },
    //       end: {
    //         dateTime: DateTime.now()
    //           .plus({ day: 1 })
    //           .startOf('day')
    //           .plus({ hour: 15 })
    //           .setZone('Europe/Minsk')
    //           .toString(),
    //         timeZone: 'Europe/Minsk',
    //       },
    //       // recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
    //       // reminders: {
    //       //   useDefault: false,
    //       //   overrides: [
    //       //     { method: 'email', minutes: 24 * 60 },
    //       //     { method: 'popup', minutes: 10 },
    //       //   ],
    //       // },
    //     },
    //   });
    //   console.log(result);
    //   return result;
    // } catch (e) {
    //   console.log(e);
    //   return e.message;
    // }

    try {
      const tasksService = google.tasks({ version: 'v1', auth: oAuthClient });
      const { data: taskList } = await tasksService.tasklists.list({
        maxResults: 1,
      });

      if (taskList.items.length === 0) {
        throw new Error('No task list found');
      }
      const taskListId = taskList.items[0].id;
      const result = await tasksService.tasks.insert({
        tasklist: taskListId,
        requestBody: {
          title: 'task title',
          notes: 'task notes',
          due: DateTime.now()
            .startOf('day')
            .plus({ day: 1, hour: 18 })
            .setZone('Europe/Minsk')
            .toISO(),
        },
      });
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return e.message;
    }

    // try {
    //   const res = await calendarApi.events.list({
    //     calendarId: 'primary',
    //     timeMin: DateTime.now().toISO(),
    //     timeMax: DateTime.now().plus({ day: 10 }).toISO(),
    //     maxResults: 10,
    //     singleEvents: false,
    //     orderBy: 'updated',
    //   });
    //   const events = res.data.items;
    //   if (!events || events.length === 0) {
    //     console.log('No upcoming events found.');
    //     return;
    //   }
    //   console.log('Upcoming 10 events:');
    //   events.map((event) => {
    //     const start = event.start.dateTime || event.start.date;
    //     console.log(`${start} - ${event.summary}`, event);
    //   });
    // } catch (e) {
    //   console.log(e.message, e);
    // }
    // console.log('==============================================');
    // try {
    //   const tasksService = google.tasks({ version: 'v1', auth: oAuthClient });
    //   const res = await tasksService.tasklists.list({
    //     maxResults: 10,
    //   });
    //   const events = res.data.items ?? [];
    //   console.log('Upcoming 10 tasklists:');
    //   events.forEach((event) => {
    //     console.log(event);
    //   });
    // } catch (e) {
    //   console.log(e.message, e);
    // }

    return 'oAuthClient.getTokenInfo(user.token.access_token)';
  }
}
