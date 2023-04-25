import { IsNotEmpty, Length,IsEmail,IsStrongPassword } from "class-validator"
import { PASSWORD_CONFIG,STRONG_PASSWORD_CONFIG } from "../../authentication/auth-config/registration-constants"
import { ApiProperty } from "@nestjs/swagger/dist" 
/**
 * This is a Login User DTO object that is gotten from the front-end and used for adding questions to the database
 ````
 export class LogInUserDto{
     email:string
     password:string  
}

 ````
 * @see [MAXDRIVE Status Codes](https://docs.nestjs.com/controllers#status-code)
 *
 * @publicApi
 */
export class LogInUserDto {

    @ApiProperty({description:'Email of User',example:'guonnie@gmail.com'})
    @IsNotEmpty({ message: 'Should have a valid email' })
    @Length(1, 200)
    @IsEmail()
    readonly email: string

    @ApiProperty({description:'Password of User',example:'Password1234&'})
    @IsNotEmpty({ message: 'Should have a password' })
    @Length(1, 200)
    readonly password: string


}
