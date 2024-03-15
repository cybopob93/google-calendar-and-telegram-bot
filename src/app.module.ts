import { Module } from '@nestjs/common';
import { ToastModule } from './toast/toast.module';
import { CommonModule } from './common/common.module';
import { GoogleCalendarModule } from './google.calendar/google.calendar.module';
import { UserModule } from './user/user.module';
import { dbConnectionConfig } from './common/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConnectionConfig,
      autoLoadEntities: true,
    }),
    ToastModule,
    CommonModule,
    GoogleCalendarModule,
    UserModule,
  ],
})
export class AppModule {}
