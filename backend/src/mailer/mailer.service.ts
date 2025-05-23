import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { Address } from "nodemailer/lib/mailer";
import { SendEmailDTO } from "./dto/sendEmailDTO.dto";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) {}

    private MailTransporter(): nodemailer.Transporter {
        return nodemailer.createTransport({
            secure: false,
            host: this.configService.get<string>("MAIL_HOST"),
            port: this.configService.get<number>("MAIL_PORT"),
            auth: {
                user: this.configService.get<string>("MAIL_USER"),
                pass: this.configService.get<string>("MAIL_PASSWORD"),
            },
        });
    }

    async SendEmail(data: SendEmailDTO): Promise<void> {
        const transporter = this.MailTransporter();

        const options: Mail.Options = {
            subject: data.subject,
            html: `<p>${data.info}</p>`,
            to: data.recipient as Address,
            from: {
                name: this.configService.get<string>("APP_NAME") as string,
                address: this.configService.get<string>("HOST_EMAIL") as string,
            },
        };

        try {
            await transporter.sendMail(options);
        } catch (error) {
            throw new ConflictException("Try again later: " + error);
        }
    }
}
