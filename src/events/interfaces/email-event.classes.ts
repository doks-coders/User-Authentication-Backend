import { MailDataRequired } from "@sendgrid/helpers/classes/mail";

export class SendEmailClass {
   
    constructor(emailData: MailDataRequired) {
        let keys = Object.keys(emailData)
        keys.forEach((emailKey) => {
            this[emailKey] = emailData[emailKey]
        })
    }
}

export interface SendEmailInterface{
    from: string
    to: string
    subject: string
    text: string

}

