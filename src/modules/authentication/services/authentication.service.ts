import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TempEmail } from '../entities/temp-email.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt';
import { globalKeyVariables } from 'src/config/env.config';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { ERROR, ERROR_MESSAGE_RESPONSE } from '../auth-config/registration-constants'
import { HttpStatus, HttpException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CustomHttpException } from 'src/utils/global.constants';


@Injectable()
export class AuthenticationService {
    constructor(@InjectRepository(TempEmail) private tempEmailRepository: Repository<TempEmail>,

        @InjectRepository(User) private usersRepository: Repository<User>, private usersService: UsersService, private jwtService: JwtService) { }
        async checkIfTemp_EmailExists(emailJWT: string): Promise<object> {
        let email_object = await this.tempEmailRepository.findOne({ where: { email_url: emailJWT } })
        if (!email_object) throw  CustomHttpException(ERROR.EMAIL_UNAVAILABLE, HttpStatus.NOT_FOUND);
        let parsedJwt
        try { parsedJwt = await this.verifyJWT(email_object.email_url) } catch (error) {
            throw  CustomHttpException(ERROR_MESSAGE_RESPONSE[error.message], HttpStatus.FORBIDDEN);
        }
        return parsedJwt
    }
  

    async setNewPassWords(newPasswords:{password:string,passwordVerify:string},emailJWT:string) {
      const emailParsed =   await this.verifyJWT(emailJWT)
      const user = await this.usersRepository.findOne({where:{email:emailParsed['email']}})
      const passwordReset = await user.passwordReset
      if(passwordReset===('true'||true)){
        const hashedPassword = await this.hashPassword(newPasswords.password)
        user.password = hashedPassword
        user.passwordVerify = newPasswords.passwordVerify
        user.passwordReset = false
        const savedUser = await user.save()
        return savedUser
      }else{
        throw  CustomHttpException(ERROR.UNAUTHORIZED_REQUEST, HttpStatus.UNAUTHORIZED);
   
      }
    }

    async verifyJWT(jwtValue){
       const parsedJwt = await this.jwtService.verify(jwtValue, { secret: globalKeyVariables().JWT_KEY })
    return parsedJwt
    }

    async hashPassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    async passwordResetActive(JWTString:string):Promise<User>{
     let  new_email_object
      try {
        const parsedJWT = await this.verifyJWT(JWTString)
        let email_object = await this.usersRepository.findOne({ where: { email:parsedJWT['email_url'] } })
        email_object.passwordReset =true
         new_email_object =  await email_object.save()
      } catch (error) {
        throw  CustomHttpException(ERROR_MESSAGE_RESPONSE[error.message], HttpStatus.FORBIDDEN);
      }
      
        return new_email_object
    }
    


    async configureUserActivated(email: string): Promise<string> {
        let email_object = await this.usersRepository.findOne({ where: { email } })
        if (!email_object) throw new HttpException(ERROR.EMAIL_UNAVAILABLE, HttpStatus.NOT_FOUND);
        email_object.verifiedAccount = true
        const modifiedUser = await email_object.save()
        if (!modifiedUser) throw new HttpException(ERROR.DATABASE_WRITE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        const userJwt = await this.usersService.getJWTFROM_USER(email_object)
        return userJwt
    }

    async forgotPassword(email:string){

    }


}
