import nodeMailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import _ from 'lodash';
import isHtml from 'is-html';


export class EmailService {
    private sender: Mail;

    constructor(user: string, password: string) {
        this.sender = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: password
            }
        });
    }

    async send(emailConfig: Mail.Options) {
        if (isToFieldValid(emailConfig)) {
            if (typeof emailConfig.html === 'string' && isHtml(emailConfig.html)) {
                return this.sender.sendMail(emailConfig);
            }
            const {html: text, ...textEmailConfig} = emailConfig;
            return this.sender.sendMail({...textEmailConfig, text})
        }
    }
}


function isToFieldValid(emailConfig: Mail.Options) {
    const isNonEmptyListOfAddresses = _.isArray(emailConfig.to) && emailConfig.to.length > 0;
    const isNonEmptySingleAddress = _.isString(emailConfig.to) && !!emailConfig.to;
    return isNonEmptyListOfAddresses || isNonEmptySingleAddress;
}
