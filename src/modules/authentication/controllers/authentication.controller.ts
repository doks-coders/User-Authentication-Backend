import { Controller, Get, Post, Body, HttpCode, Param, HttpStatus, HttpException, Query, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { SuccesResponse } from 'src/config/response.status';
import { ERROR, SUCCESS } from 'src/modules/authentication/auth-config/registration-constants';
import { SetNewPasswordDTO } from '../dtos/set-new-password.dto';
import { ErrorValidation } from 'src/utils/global.constants';
import { CustomHttpException } from 'src/utils/global.constants';
import { PasswordMismatchResponse } from '../../../responses-swagger/user.response';
import {
    EmailUnavailableResponse,
    ResetPasswordResponse,
    UnauthorizedPasswordResetResponse,
    VerifyEmailResponse,
    EmailLinkExpiredResponse,
    ResetPasswordVerifyResponse
} from '../../../responses-swagger/user.response';

import { DatabaseWriteFailedResponse, } from '../../../responses-swagger/user.response';

import {
    //Bad Status Codes   
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiUnprocessableEntityResponse,
    ApiNotFoundResponse,
    ApiInternalServerErrorResponse,
    // Good Status Codes
    ApiOkResponse,
    ApiCreatedResponse,

    ApiTags,
    ApiParam,

} from "@nestjs/swagger/dist"




@ApiTags('2. Authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(private authentication: AuthenticationService) { }
    @Get('verify-email/:emailJWT')
    @ApiParam({ description: 'This is gotten from the front-end. through the [params.id] of the url that was sent to the email', name: 'emailJWT' })
    @ApiOkResponse({ description: 'This success response is gotten when the user authenticates his/her account from his/her email', type: VerifyEmailResponse })
    @ApiInternalServerErrorResponse({ description: 'This error is gotten if the verifiedAccount fails to save', type: DatabaseWriteFailedResponse })
    @ApiForbiddenResponse({ description: 'This error is gotten if the email link has expired', type: EmailLinkExpiredResponse })
    @ApiNotFoundResponse({ description: 'This error is gotten when the user email is not found', type: EmailUnavailableResponse })
    @HttpCode(200)
    async getEmailVerificationUrl(@Param('emailJWT') emailJWT: string): Promise<object> {
        let email_object = await this.authentication.checkIfTemp_EmailExists(emailJWT)
        let userJwt = await this.authentication.configureUserActivated(email_object['email'])
        return new SuccesResponse(201, { message: SUCCESS.VERIFIED_ACCOUNT_SUCCESS, userJwt })
    }

    @Get('forgot-password/:emailJWT')
    @ApiParam({ description: 'This is gotten from the front-end. through the [params.id] of the url that was sent to the email', name: 'emailJWT' })
    @ApiOkResponse({ description: 'This success response is gotten if the passwordReset is set to true, which means the user can set a new password now', type: ResetPasswordVerifyResponse })
    @ApiNotFoundResponse({ description: 'This error is gotten when the user email is not found', type: EmailUnavailableResponse })
    @ApiForbiddenResponse({ description: 'This error is gotten if the email link has expired', type: EmailLinkExpiredResponse })
    @ApiInternalServerErrorResponse({ description: 'This error is gotten if the passwordResetActive fails to save', type: DatabaseWriteFailedResponse })
    @HttpCode(200)
    async forgotPassword(@Param('emailJWT') emailJWT: string): Promise<object> {
        await this.authentication.checkIfTemp_EmailExists(emailJWT)
        const new_email_object = await this.authentication.passwordResetActive(emailJWT)
        if (!new_email_object) throw CustomHttpException(ERROR.DATABASE_WRITE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        console.log({ new_email_object })
        return new SuccesResponse(HttpStatus.OK, { message: SUCCESS.AUTHORISED_PASSWORD_RESET })
    }

    @Post('/forgot-password-set/:emailJWT')

    @ApiParam({ description: 'This is gotten from the front-end. through the [params.id] of the url that was sent to the email', name: 'emailJWT' })
    @ApiCreatedResponse({ description: 'This is the success response gotten from setting the new user password', type: ResetPasswordResponse })
    @ApiNotFoundResponse({ description: 'This error is gotten when the user email is not found', type: EmailUnavailableResponse })
    @ApiForbiddenResponse({ description: 'This error is gotten if the email link has expired', type: EmailLinkExpiredResponse })
    @ApiUnauthorizedResponse({ description: 'This error is gotten if the passwordReset property is not active', type: UnauthorizedPasswordResetResponse })
    @ApiUnprocessableEntityResponse({ description: 'This error is gotten if the passwords do not match', type: PasswordMismatchResponse })
    @HttpCode(200)

    async setNewPasswords(@Param('emailJWT') emailJWT: string, @Body(ErrorValidation) newPasswords: SetNewPasswordDTO): Promise<object> {
        await this.authentication.checkIfTemp_EmailExists(emailJWT)
        const { password, passwordVerify } = newPasswords
        if (password != passwordVerify) { throw CustomHttpException(ERROR.PASSWORD_MISMATCH_RESPONSE, HttpStatus.UNPROCESSABLE_ENTITY); }
        const savedUser = await this.authentication.setNewPassWords(newPasswords, emailJWT)
        return new SuccesResponse(201, { message: SUCCESS.PASSWORD_RESET_SUCCESS })
    }
}
  /**
 * SuccesResponse(201, {message:SUCCESS.PASSWORD_RESET_SUCCESS})
 * 
 * CustomHttpException(ERROR.PASSWORD_MISMATCH_RESPONSE, HttpStatus.UNPROCESSABLE_ENTITY)
   * CustomHttpException(ERROR.EMAIL_UNAVAILABLE, HttpStatus.NOT_FOUND);
   *  CustomHttpException(ERROR_MESSAGE_RESPONSE[error.message], HttpStatus.FORBIDDEN);
   * 
   * CustomHttpException(ERROR.UNAUTHORIZED_REQUEST, HttpStatus.UNAUTHORIZED);
   */