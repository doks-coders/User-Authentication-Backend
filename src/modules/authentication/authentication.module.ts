import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempEmail } from './entities/temp-email.entity';
import { User } from '../users/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigAsync } from 'src/config/jwt.config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
@Module({
  imports:[TypeOrmModule.forFeature([TempEmail,User]),
  JwtModule.registerAsync(jwtConfigAsync),],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,UsersService]
})
export class AuthenticationModule {}
 