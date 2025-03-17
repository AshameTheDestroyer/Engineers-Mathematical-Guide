import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDTO } from './dto/sendEmailDTO.dto';
import { Address } from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  private mailTransporter(): nodemailer.Transporter {
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  async sendEmail(sendEmailDTO: SendEmailDTO): Promise<void> {
    const transporter = this.mailTransporter();

    const options: Mail.Options = {
      from: {
        name: this.configService.get<string>('APP_NAME') as string,
        address: this.configService.get<string>('HOST_EMAIL') as string,
      },
      to: sendEmailDTO.recipient as Address,
      subject: sendEmailDTO.subject,
      html: `<p>${sendEmailDTO.info}</p>`,
    };
    try {
      await transporter.sendMail(options);
    } catch (error) {
      throw new ConflictException('Try again later ' + error);
    }
  }
}
