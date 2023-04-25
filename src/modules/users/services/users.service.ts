import { Injectable } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LogInUserDto } from '../dtos/login-user.dto';
import { HttpStatus, HttpException } from '@nestjs/common'
import { ERROR } from 'src/modules/authentication/auth-config/registration-constants';
import { JwtService } from '@nestjs/jwt';
import { TempEmail } from 'src/modules/authentication/entities/temp-email.entity';
import { CustomHttpException } from 'src/utils/global.constants';
import { SuccesResponse } from 'src/config/response.status';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,) { }
    async registerUser(registerUser: RegisterUserDto): Promise<User> {
        let response
        try {
            const user = new User()
            user.email = registerUser.email
            user.name = registerUser.name
            user.password = registerUser.password
            user.passwordVerify = registerUser.passwordVerify
            user.role = registerUser.role
            user.verifiedAccount = registerUser.verifiedAccount
            user.passwordReset = false
            response = await user.save()
        } catch (error) {
            if (error.message.includes(ERROR.CONFLICT_MESSAGE)) {
                throw CustomHttpException(ERROR.EMAIL_CONFLICT_RESPONSE, HttpStatus.FORBIDDEN);
            }
        }
        return response

    }

    checKURlForSlash(link: string) {
        let lastCharacter = link[link.length - 1]
        if (lastCharacter === '/') throw CustomHttpException(ERROR.REMOVE_SLASH_ERROR, HttpStatus.UNPROCESSABLE_ENTITY)
    }
    async loginUser(loginInDetails: LogInUserDto) {
        const { password, email } = loginInDetails
        let user = await this.checkifUserWith_email(email)
        if (!user) throw CustomHttpException(ERROR.EMAIL_UNAVAILABLE, HttpStatus.NOT_FOUND)
        const verifiedAccount = await user.verifiedAccount.toString()
        if (verifiedAccount === 'false') throw CustomHttpException(ERROR.UNVERIFIED_ACCOUNT, HttpStatus.UNAUTHORIZED)
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) throw CustomHttpException(ERROR.PASSWORD_INCORRECT, HttpStatus.UNPROCESSABLE_ENTITY);
        const userJWT = await this.getJWTFROM_USER(user)
        return userJWT
    }

    async checkifUserWith_email(email){
        let user = await this.usersRepository.findOne({ where: {email} })
        if (!user) throw CustomHttpException(ERROR.EMAIL_UNAVAILABLE, HttpStatus.NOT_FOUND)
        return user
    }


    async getJWTFROM_EMAIL(user: any): Promise<string> {
        const { email } = user
        const jwtEmailString = await this.jwtService.signAsync({ email })
        return jwtEmailString
    }


    async getJWTFROM_USER(user: User): Promise<string> {
        const { email, name, password } = user
        const jwtEmailString = await this.jwtService.signAsync({ email, name, password })
        return jwtEmailString
    }

    async registerTemp_EMAIL(emailJWT: string) {
        const temp_email = new TempEmail()
        temp_email.email_url = emailJWT
        let responseObject = await temp_email.save()
        return responseObject
    }
}



