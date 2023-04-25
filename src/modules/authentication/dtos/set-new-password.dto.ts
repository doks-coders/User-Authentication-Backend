import { IsNotEmpty, Length,IsStrongPassword } from "class-validator"
import { PASSWORD_CONFIG,STRONG_PASSWORD_CONFIG } from "../../authentication/auth-config/registration-constants"
import { ApiProperty } from "@nestjs/swagger/dist" 
/**
 * This is a Set New Password DTO object that is gotten from the front-end and used for setting new passwords for the user
 ````
 export class SetNewPasswordDTO{
     passwordVerify:string
     password:string  
}

 ````
 * @see [MAXDRIVE Status Codes](https://docs.nestjs.com/controllers#status-code)
 *
 * @publicApi
 */
export class SetNewPasswordDTO {
    @ApiProperty({description:'Password of User',example:'Password1234&'})
    @IsNotEmpty({ message: 'Should have a valid password' })
    @Length(1, 200)
    @IsStrongPassword(STRONG_PASSWORD_CONFIG,{message:PASSWORD_CONFIG.PASSWORD_RULE})
    readonly password: string

    @ApiProperty({description:'Verified Password of User',example:'Password1234&'})
    @IsNotEmpty({ message: 'Should have a valid password' })
    @Length(1, 200)
    @IsStrongPassword(STRONG_PASSWORD_CONFIG,{message:PASSWORD_CONFIG.PASSWORD_RULE})
    readonly passwordVerify: string
}
