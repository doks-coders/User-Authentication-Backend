import { IsNotEmpty, Length, IsEmail, IsStrongPassword,IsUrl } from "class-validator"
import { PASSWORD_CONFIG, STRONG_PASSWORD_CONFIG } from "../../authentication/auth-config/registration-constants"
import { ApiProperty } from "@nestjs/swagger/dist"

/**
 * This is a Register User DTO object that is gotten from the front-end and used for adding questions to the database
 ````
 export class RegisterUserDto{
     name:string
     email:string
     password:string  
     passwordVerify:string
     role:string
     verifiedAccount:boolean
}

 ````
 * @see [MAXDRIVE Status Codes](https://docs.nestjs.com/controllers#status-code)
 *
 * @publicApi
 */
export class RegisterUserDto {

    @ApiProperty({ description: 'Name of User', example: 'Daniel Odokuma' })
    @IsNotEmpty({ message: 'Should have a name' })
    @Length(1, 200)
    readonly name: string

    @ApiProperty({ description: 'Email of User', example: 'david@gmail.com' })
    @IsNotEmpty({ message: 'Should have a valid email' })
    @Length(1, 200)
    @IsEmail()
    readonly email: string

    @ApiProperty({ description: 'Password of User', example: 'Password1234&' })
    @IsNotEmpty({ message: 'Should have a password' })
    @Length(1, 200)
    @IsStrongPassword(STRONG_PASSWORD_CONFIG, { message: PASSWORD_CONFIG.PASSWORD_RULE })
    readonly password: string

    @ApiProperty({ description: 'Verified Password of User', example: 'Password1234&' })
    @IsNotEmpty({ message: 'Should have a verified password' })
    @Length(1, 200)
    @IsStrongPassword(STRONG_PASSWORD_CONFIG, { message: PASSWORD_CONFIG.PASSWORD_RULE })
    readonly passwordVerify: string

    @ApiProperty({ description: 'Role of User', example: 'admin' })
    @IsNotEmpty({ message: 'Should have a role' })
    @Length(1, 200)
    readonly role: string

    @ApiProperty({description:'Domain of Front-end',example:'https://mywebsite.com/verify-email'})
    @IsNotEmpty({ message: 'Should have a valid domain link' })
    @Length(1, 200)
    @IsUrl()
    readonly frontend_verify_emailLink: string


    readonly verifiedAccount: boolean

}
