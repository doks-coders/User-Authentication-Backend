import { IsNotEmpty, Length,IsEmail,IsStrongPassword,IsUrl } from "class-validator"
import { PASSWORD_CONFIG,STRONG_PASSWORD_CONFIG } from "../../authentication/auth-config/registration-constants"
import { ApiProperty } from "@nestjs/swagger/dist" 
/**
 * This is a Forgot Password DTO object that is gotten from the front-end and used for adding questions to the database
 ````
 export class ForgotPasswordDTO{
     email:string
}

 ````
 * @see [MAXDRIVE Status Codes](https://docs.nestjs.com/controllers#status-code)
 *
 * @publicApi
 */
export class ForgotPasswordDTO {
    
    @ApiProperty({description:'Email of User',example:'guonnie@gmail.com'})
    @IsNotEmpty({ message: 'Should have a valid email' })
    @Length(1, 200)
    @IsEmail()
    readonly email: string


    @ApiProperty({description:'Domain of Front-end',example:'https://mywebsite.com/forgot-password'})
    @IsNotEmpty({ message: 'Should have a valid domain link' })
    @Length(1, 200)
    @IsUrl()
    readonly frontend_verify_emailLink: string

}
