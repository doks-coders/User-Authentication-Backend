
export const ForgotPasswordTemplate = ({JWTString,DOMAINLink}:{JWTString:string,DOMAINLink:string})=>{
    return  `If you forgot your password recently, please use this link to reset the password to your account: ${removeSlashFromUrl(DOMAINLink)}/${JWTString} `
}

const removeSlashFromUrl=(url)=>{
    let urlArray = url.split('')
    let lastCharacter =urlArray[urlArray.length-1]
     if(lastCharacter ==='/') urlArray.splice(urlArray.length-1)
     return urlArray.join('')
}



