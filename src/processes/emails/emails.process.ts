
import * as sgMail from '@sendgrid/mail';
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import { globalKeyVariables } from 'src/config/env.config';
import { Injectable } from '@nestjs/common'; 
   
@Injectable()
export class EmailProcess{
    async sendEmail(msg:MailDataRequired)  {
        return new Promise((resolve, reject) => {
let SEND_GRIDKEY =  globalKeyVariables().SEND_GRIDKEY

          sgMail.setApiKey(SEND_GRIDKEY)
          sgMail.send(msg)
            .then((response) => {
              resolve('Message Sent')
              console.log({ statusCode: response[0].statusCode })
              console.log({ headers: response[0].headers })
            }).catch((error) => {
             // console.error(error)
              reject(error)
            })
        })
        
      }
}

 
  
  