import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { SendEmailDTO } from '../mailer/dto/sendEmailDTO.dto';
import { SignUpDTO } from './dto/signup.dto';
import { ObjectId } from 'typeorm';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private async assignToken(payload: object, expiresIn: string) {
    const options = {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn,
    };
    return `Bearer:${await this.jwtService.signAsync(payload, options)}`;
  }

  async logIn(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDTO;
    const user = await this.userService.findOneByEmail(email, password, true);
    const payload = { userId: user.id, username: user.username };
    return { accessToken: await this.assignToken(payload, '7d') };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.createUser(signUpDTO);
    const payload = { userId: user.id, username: user.username };
    return { accessToken: await this.assignToken(payload, '7d') };
  }

  async forgetPassword(email: string): Promise<{message:string}> {
    const user = await this.userService.findOneByEmail(
      String(email),
      '',
      false,
    );
    const payload = { userId: user.id, resetPassword: true };

    // assign token
    const token = await this.assignToken(payload, '15m');

    // link for reset password page
    const link = `${this.configService.get<string>('FRONT_END_DOMAINE')}/reset-password/${token}`;
    
    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../../template/reset-password.html'), 'utf8');

    const personalizedHtml = htmlTemplate
      .replace(/{userName}/g, user.username)
      .replace(/{resetLink}/g, link)
      .replace(/{currentYear}/g, new Date().getFullYear().toString())
      .replace(/{companyWebsite}/g, 'https://mathware.com/')
      .replace(/{privacyPolicy}/g, 'https://mathware.com/privacy')
      .replace(/{contactUs}/g, 'https://mathware.com/contact');

    // send the link to the email
    const sendEmailDTO: SendEmailDTO = {
      recipient: { name: user.username, address: user.email },
      subject: 'Reset Password',
      html: personalizedHtml,
      link
    };
    await this.mailService.sendEmail(sendEmailDTO);

    return {message:'Reset Link Has Been Sent To Your Email Check It Out'};
  }

  async resetPassword(
    userId: ObjectId,
    newPassword: string,
  ): Promise<{ message: string }> {
    await this.userService.updateUserPassword(userId, newPassword);
    return { message: 'Password Successfully Updated.' };
  }
}
