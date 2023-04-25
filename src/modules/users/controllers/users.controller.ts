import { Controller, Get, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ErrorValidation } from 'src/utils/global.constants';
import { ERROR, SUCCESS } from 'src/modules/authentication/auth-config/registration-constants';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { ForgotPasswordDTO } from '../dtos/forgot-password.dto';
import { LogInUserDto } from '../dtos/login-user.dto';
import { UsersService } from '../services/users.service';
import { SuccesResponse } from 'src/config/response.status';
import { ForgotPasswordTemplate } from 'src/processes/emails/email-templates/forgot-password.template';
import { AuthenticateUserTemplate } from 'src/processes/emails/email-templates/authenticate-user.template';
import { EmailEvent } from 'src/events/constants/email-event.constant';
import { SendEmailClass } from 'src/events/interfaces/email-event.classes';
import { EmailRecieverService } from 'src/processes/emails/email.service';
import { CustomHttpException } from 'src/utils/global.constants';
import { CreatedUserResponse, EmailConflictResponse, WrongPasswordFormatResponse, PasswordMismatchResponse } from '../../../responses-swagger/user.response';
import { EmailUnavailableResponse, PasswordIncorrectResponse, UnverifiedAccountResponse, LoginUserResponse } from '../../../responses-swagger/user.response';

import {

  RemoveSlashErrorResponse, DatabaseWriteFailedResponse, EmailServiceFailedResponse, IncorrectUrlResponse,
  ForgotPasswordResponse
} from '../../../responses-swagger/user.response';
import {
  //Bad Status Codes   
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiBadGatewayResponse,
  ApiGatewayTimeoutResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiMethodNotAllowedResponse,
  ApiPayloadTooLargeResponse,
  ApiServiceUnavailableResponse,
  ApiRequestTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiDefaultResponse,
  ApiTooManyRequestsResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiPreconditionFailedResponse,
  ApiNotAcceptableResponse,

  // Good Status Codes
  ApiOkResponse,
  ApiCreatedResponse,
  // Misc
  ApiHeaders,
  ApiTags,

} from "@nestjs/swagger/dist"

@ApiTags('1. Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private eventEmitter: EventEmitter2, private emailRecieverService: EmailRecieverService) { }
  @Post('register-user')
  /*
   @ApiHeaders([{
     name:'Authorisation',
   }])
   */
  @ApiCreatedResponse({
    description: 'You have successfully created a user, proceed to verification',
    type: CreatedUserResponse
  })

  @ApiForbiddenResponse({ description: 'You will get this error if there is another similiar email', type: EmailConflictResponse })
  @ApiUnprocessableEntityResponse({ description: `You will get this error if your password doesn't minimum of 8 characters and it should contain a symbol, a capital letter, a lowercase letter and a number `, type: WrongPasswordFormatResponse })
  @ApiUnauthorizedResponse({ description: 'You will get this error when your passwords do not match ', type: PasswordMismatchResponse })

  @HttpCode(201)
  async registerUser(@Body(ErrorValidation) registerUser: RegisterUserDto): Promise<object> {
    let _clonedValues = { ...registerUser, verifiedAccount: false }
    const { password, passwordVerify, frontend_verify_emailLink } = _clonedValues
    this.usersService.checKURlForSlash(frontend_verify_emailLink)
    if (password != passwordVerify) { throw CustomHttpException(ERROR.PASSWORD_MISMATCH_RESPONSE, HttpStatus.UNPROCESSABLE_ENTITY) }
    const newUser = await this.usersService.registerUser(_clonedValues)
    const emailJWT = await this.usersService.getJWTFROM_EMAIL(newUser)
    ///////////---------------///////////////

    this.eventEmitter.emit(EmailEvent.SEND_EMAIL, new SendEmailClass({
      from: 'guonnie@gmail.com',
      to: _clonedValues.email,
      subject: 'Authenticate User',
      text: AuthenticateUserTemplate({ JWTString: emailJWT, DOMAINLink: _clonedValues.frontend_verify_emailLink, name: _clonedValues.name })

    })
    )

    const temp_email_response = await this.usersService.registerTemp_EMAIL(emailJWT)
    if (!temp_email_response) throw CustomHttpException(ERROR.DATABASE_WRITE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);

    return new SuccesResponse(201, {
      email_auth_link: `${frontend_verify_emailLink}` + '/${:id}',
      message: 'Account Created Succesfully',

    })
  }


  @Post('login-user')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'You have successfully logged in',
    type: LoginUserResponse
  })
  @ApiNotFoundResponse({ description: `You will get this error if the user's email is not registered`, type: EmailUnavailableResponse })
  @ApiUnauthorizedResponse({ description: `You will get this error if the user hasn't verified his/her email`, type: UnverifiedAccountResponse })
  @ApiUnprocessableEntityResponse({ description: `You will get this error if the passwords do not match`, type: PasswordIncorrectResponse })
  async loginUser(@Body(ErrorValidation) loginUser: LogInUserDto) {
    const userJWT = await this.usersService.loginUser(loginUser)
    return new SuccesResponse(200, {
      message: 'User logged in successfully',
      userJWT
    })
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOkResponse({
    description: `You will get this response if the link was successfully sent to the email of the user`, type: ForgotPasswordResponse
  })
  @ApiNotFoundResponse({ description: `You will get this error if the user's email is not registered`, type: EmailUnavailableResponse })
  @ApiServiceUnavailableResponse({ description: 'You will get this error if the email service is currently unavailable', type: EmailServiceFailedResponse })
  @ApiInternalServerErrorResponse({ description: 'You will get this error if there is an internal problem with the database', type: DatabaseWriteFailedResponse })
  @ApiForbiddenResponse({ description: `You will get this error with if there is a '/' at the end of your url, example: http://mywebsite.com/forgot-password/`, type: RemoveSlashErrorResponse })
  @ApiUnprocessableEntityResponse({ description: 'You will get this error, if your url is incorrect', type: IncorrectUrlResponse })

  async forgotPassword(@Body(ErrorValidation) emailObject: ForgotPasswordDTO) {
    const { frontend_verify_emailLink } = emailObject
    this.usersService.checKURlForSlash(frontend_verify_emailLink)
    await this.usersService.checkifUserWith_email(emailObject.email)
    const emailJWT = await this.usersService.getJWTFROM_EMAIL(emailObject)
    if (!emailJWT) throw CustomHttpException(ERROR.JWT_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);


    const emailStatus = await this.emailRecieverService.sendEmail(new SendEmailClass({
      from: 'guonnie@gmail.com',
      to: emailObject.email,
      subject: 'Forgot Password',
      text: ForgotPasswordTemplate({
        JWTString: emailJWT,
        DOMAINLink: emailObject.frontend_verify_emailLink
      })
    }))
    if (!emailStatus['sent']) throw CustomHttpException(ERROR.EMAIL_SERVICE_FAILED, HttpStatus.SERVICE_UNAVAILABLE);
    const temp_email_response = await this.usersService.registerTemp_EMAIL(emailJWT)
    if (!temp_email_response) throw CustomHttpException(ERROR.DATABASE_WRITE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);

    return new SuccesResponse(200, { message: SUCCESS.FORGOT_PASSWORD_SUCCESS, JWTString: emailJWT })
  }
}
