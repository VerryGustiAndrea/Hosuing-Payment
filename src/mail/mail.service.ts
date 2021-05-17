import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendTagihanInfo(email: string, title: string, message: string, name: string) {
        const url = `example.com/auth/confirm?token=${name}`;
        console.log(email, name, title, message)
        try {
            await this.mailerService.sendMail({
                to: email,
                // from: '"Support Team" <support@example.com>', // override default from
                subject: title,
                template: './template/confirmation.hbs', // `.hbs` extension is appended automatically
                context: { // ✏️ filling curly brackets with content
                    name: name,
                    title,
                    message
                },
            });
        } catch (error) {
            throw new Error(error);
        }
        return true
    }
}
