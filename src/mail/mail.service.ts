import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendTagihanInfo(email: string, name: string) {
        const url = `example.com/auth/confirm?token=${name}`;

        try {
            await this.mailerService.sendMail({
                to: email,
                // from: '"Support Team" <support@example.com>', // override default from
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './template/confirmation.hbs', // `.hbs` extension is appended automatically
                context: { // ✏️ filling curly brackets with content
                    name: name,
                    url,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
        return true
    }
}
