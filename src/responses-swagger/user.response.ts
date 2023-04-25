import { ApiProperty } from "@nestjs/swagger/dist"
import {ERROR,ERROR_MESSAGE_RESPONSE,ERROR_NAMES, SUCCESS} from '../modules/authentication/auth-config/registration-constants'
import { HttpStatus } from "@nestjs/common/enums"






/************************Sign Up Responses (Ok)******************************************/

class UserObject {
    @ApiProperty({ description: `This is the api for verifying the user's account, get the id from the route leading to your verification page and make a get request with this api `, example: 'http://mywebsite.com/auth/email-verification/${:id}' })
    email_auth_link: string

    @ApiProperty({ description: 'This is the success message', example: 'Account Created Succesfully' })
    message: string

 
}
export class CreatedUserResponse {
    @ApiProperty({ description: `The route request`, example: HttpStatus.CREATED })
    statusCode: number
    @ApiProperty({
        description: `This is the response body`,
        type: UserObject
    })
    responseValue: object
}

/************************Sign Up Responses (Error)******************************************/

export class EmailConflictResponse{
    @ApiProperty({ description: `The route request`, example: HttpStatus.FORBIDDEN })
    statusCode: number
    @ApiProperty({
        description: `This is the error message`,
        example:[ERROR.EMAIL_CONFLICT_RESPONSE]

    })
    message: object

    
    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.FORBIDDEN] })
    error:string
}


export class WrongPasswordFormatResponse{
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNPROCESSABLE_ENTITY })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.PASSWORD_VALIDATION_ERROR]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNPROCESSABLE_ENTITY] })
    error:string
}

export class PasswordMismatchResponse {
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNPROCESSABLE_ENTITY })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.PASSWORD_MISMATCH_RESPONSE]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNPROCESSABLE_ENTITY] })
    error:string

}

/************************Log In Errors (ok)******************************************/

class LoginResponseValue{
    @ApiProperty({
        description: `This is the jwt of the user, that should be saved in the local storage of the browser`,
        example:'*****************************'
    })
    userJWT:string


    @ApiProperty({
        description: `This is the success message`,
        example:'User Logged In Successfully'
    })
    message:string

}


export class LoginUserResponse{

    @ApiProperty({ description: `The route request`, example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({
        description: `This is the response body`,
        type: LoginResponseValue
    })
    responseValue: object
}

/************************Log In Responses (Error)******************************************/

export class EmailUnavailableResponse {

    @ApiProperty({ description: `The route request`, example: HttpStatus.NOT_FOUND })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.EMAIL_UNAVAILABLE]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.NOT_FOUND] })
    error:string
      
}

export class UnverifiedAccountResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNAUTHORIZED })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.UNVERIFIED_ACCOUNT]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNAUTHORIZED] })
    error:string
}


export class PasswordIncorrectResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNPROCESSABLE_ENTITY })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.PASSWORD_INCORRECT]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNPROCESSABLE_ENTITY] })
    error:string
}



/************************Forgot Password  Responses (Ok)******************************************/



class ForgotPasswordResponseValue{
    @ApiProperty({
        description: `This is the jwt of the user, that should be saved in the local storage of the browser`,
        example:'*****************************'
    })
    JWTString:string


    @ApiProperty({
        description: `This is the success message`,
        example:SUCCESS.FORGOT_PASSWORD_SUCCESS
    })
    message:string

}


export class ForgotPasswordResponse{

    @ApiProperty({ description: `The route request`, example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({
        description: `This is the response body`,
        type: ForgotPasswordResponseValue
    })
    responseValue: object
}

/************************Forgot Password  Responses (Error)******************************************/

export class EmailServiceFailedResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.SERVICE_UNAVAILABLE })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.EMAIL_SERVICE_FAILED]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.SERVICE_UNAVAILABLE] })
    error:string
}



export class DatabaseWriteFailedResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.INTERNAL_SERVER_ERROR })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.DATABASE_WRITE_FAILED]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.INTERNAL_SERVER_ERROR] })
    error:string
}



export class RemoveSlashErrorResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.FORBIDDEN })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.REMOVE_SLASH_ERROR]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.FORBIDDEN] })
    error:string
}

export class IncorrectUrlResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNPROCESSABLE_ENTITY })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.INCORRECT_URL]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNPROCESSABLE_ENTITY] })
    error:string
}







/************************Reset Password Verify Response Value (OK)*************************************** */

class VerifyEmailResponseValue{
    @ApiProperty({
        description: `This is the success message`,
        example: SUCCESS.VERIFIED_ACCOUNT_SUCCESS 
    })
    message:string
}

export class VerifyEmailResponse{
    @ApiProperty({ description: `The route request`, example: HttpStatus.OK })
    statusCode: number
    @ApiProperty({
        description: `This is the response body`,
        type: VerifyEmailResponseValue
    })
    responseValue: object
}



/************************Reset Password Verify Response Value (OK)*************************************** */

class ResetPasswordVerifyResponseValue{
    @ApiProperty({
        description: `This is the success message`,
        example: SUCCESS.AUTHORISED_PASSWORD_RESET 
    })
    message:string
}

export class ResetPasswordVerifyResponse{
    @ApiProperty({ description: `The route request`, example: HttpStatus.OK })
    statusCode: number
    @ApiProperty({
        description: `This is the response body`,
        type: ResetPasswordVerifyResponseValue
    })
    responseValue: object
}

/***********************Reset Password Response (OK)**************************************** */


class ResetPasswordResponseValue{

    @ApiProperty({
        description: `This is the success message`,
        example:SUCCESS.PASSWORD_RESET_SUCCESS
    })
    message:string

}




export class ResetPasswordResponse{

    @ApiProperty({ description: `The route request`, example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({
        description: `This is the response body`,
        type: ResetPasswordResponseValue
    })
    responseValue: object
}

/*************************************************************** */


export class UnauthorizedPasswordResetResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.UNAUTHORIZED })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR.UNAUTHORIZED_REQUEST]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.UNAUTHORIZED] })
    error:string
}

export class EmailLinkExpiredResponse {
    
    @ApiProperty({ description: `The route request`, example: HttpStatus.FORBIDDEN })
    statusCode:number

    @ApiProperty({ description: `This is the error message`, example: [
       [ERROR_MESSAGE_RESPONSE['jwt expired']]
    ] })
  
    message:object

    @ApiProperty({ description: `This will display the name of the error`, example: ERROR_NAMES[HttpStatus.FORBIDDEN] })
    error:string
}











 /**
     * CustomHttpException(ERROR.REMOVE_SLASH_ERROR, HttpStatus.UNPROCESSABLE_ENTITY)
     * SuccesResponse(200, { message: SUCCESS.FORGOT_PASSWORD_SUCCESS, JWTString: emailJWT })
     * throw CustomHttpException(ERROR.EMAIL_SERVICE_FAILED, HttpStatus.SERVICE_UNAVAILABLE);
     * throw CustomHttpException(ERROR.DATABASE_WRITE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
     */
