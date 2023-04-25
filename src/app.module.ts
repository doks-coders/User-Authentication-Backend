import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeormdata.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { EmailRecieverService } from './processes/emails/email.service';
import { EmailProcess } from './processes/emails/emails.process';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRootAsync(typeOrmConfigAsync),UsersModule, AuthenticationModule,],
  controllers: [AppController],
  providers: [AppService,EmailRecieverService,EmailProcess],
})

export class AppModule {}