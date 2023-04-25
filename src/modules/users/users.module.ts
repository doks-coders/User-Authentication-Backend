import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConfigAsync } from 'src/config/jwt.config';
import { EventEmitterModule } from '@nestjs/event-emitter'; 
import { TempEmail } from '../authentication/entities/temp-email.entity';
import { EmailRecieverService } from 'src/processes/emails/email.service';
import { EmailProcess } from 'src/processes/emails/emails.process';
@Module({
    imports:[TypeOrmModule.forFeature([User,TempEmail],),
    JwtModule.registerAsync(jwtConfigAsync),
    EventEmitterModule.forRoot()],
    controllers: [ UsersController],
    providers: [UsersService,EmailRecieverService,EmailProcess],
    exports:[UsersService]
  })
export class UsersModule {}


