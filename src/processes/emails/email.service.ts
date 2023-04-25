import { Injectable,UnauthorizedException } from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter'
import { EmailEvent } from 'src/events/constants/email-event.constant';
import { SendEmailClass } from 'src/events/interfaces/email-event.classes';
import { emailConfig } from '../interfaces/email.interface';
import { EmailProcess } from './emails.process';

import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';


@Injectable() 
export class EmailRecieverService {
constructor(private emailProcess:EmailProcess){}
@OnEvent(EmailEvent.SEND_EMAIL)
getEvent(payload){
   this.emailProcess.sendEmail(payload).then(email_response=>{
   }).catch(err=>{
      console.log(err)
   })
}

sendEmail(payload){
   return new Promise((resolve,reject)=>{
      this.emailProcess.sendEmail(payload).then(()=>{
         resolve({sent:true})
        }).catch(err=>{
         resolve({sent:false})
        })
   })
  
}

}





