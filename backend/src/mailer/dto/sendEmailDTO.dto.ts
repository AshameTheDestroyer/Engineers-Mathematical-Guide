import { IsString } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

export class SendEmailDTO {
  recipient: Address;

  @IsString()
  subject: string;

  @IsString()
  info: string;
}
