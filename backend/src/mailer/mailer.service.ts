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
      from: '"Mathware" <no-reply@mathware.com>',
      to: sendEmailDTO.recipient as Address,
      subject: sendEmailDTO.subject,
      html: sendEmailDTO.html,
      text:`Hi ${sendEmailDTO.recipient.name},\n\nWe received a request to reset your password. 
      Please visit this link to reset your password:\n\n${sendEmailDTO.link}\n\nThis link will expire in 15 mins.
      \n\nIf you didn't request this, please ignore this email.`,
      headers:{
        'Reply-To': 'no-reply@mathware.com',
      }
    };
    try {
      await transporter.sendMail(options);
    } catch (error) {
      throw new ConflictException('Try again later ' + error);
    }
  }
}
