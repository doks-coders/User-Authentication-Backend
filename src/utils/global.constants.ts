import {HttpStatus,ValidationPipe,HttpException} from '@nestjs/common'
import {ERROR_NAMES} from '../modules/authentication/auth-config/registration-constants'
export const ErrorValidation =  new ValidationPipe({
    errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY
})


export const CustomHttpException =(message:string,statusCode:number)=> new HttpException({
    statusCode,
    message:[message],
    error:ERROR_NAMES[statusCode]},statusCode) 