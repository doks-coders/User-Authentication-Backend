export const AuthenticateUserTemplate = ({name,JWTString,DOMAINLink}:{JWTString:string,DOMAINLink:string,name:string})=>{
    return `${name}, please use this link ${DOMAINLink}/${JWTString} to authenticate your account`
}