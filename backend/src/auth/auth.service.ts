import { ObjectId } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { SignUpDTO } from "./dto/signup.dto";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { Inject, Injectable } from "@nestjs/common";
import { MailerService } from "../mailer/mailer.service";
import { SendEmailDTO } from "../mailer/dto/sendEmailDTO.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
    ) {}

    private async AssignToken(payload: object, expiresIn: string) {
        const options = {
            secret: this.configService.get<string>("JWT_SECRET"),
            expiresIn,
        };

        return await this.jwtService.signAsync(payload, options);
    }

    async Login(data: LoginDTO): Promise<{ accessToken: string }> {
        const { email, password } = data;
        const user = await this.userService.FindOneByEmail(
            email,
            password,
            true
        );

        const payload = { userId: user.id, username: user.username };
        return { accessToken: await this.AssignToken(payload, "7d") };
    }

    async Signup(data: SignUpDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.CreateUser(data);
        const payload = { userId: user.id, username: user.username };
        return { accessToken: await this.AssignToken(payload, "7d") };
    }

    async RequestForgotPassword(email: string): Promise<string> {
        const user = await this.userService.FindOneByEmail(
            String(email),
            "",
            false
        );
        const payload = { userId: user.id, resetPassword: true };
        const token = await this.AssignToken(payload, "15m");
        const link = `<a href="${this.configService.get<string>("FRONTEND_DOMAIN")}/reset-password/${token}"> click </a>`;

        const sendEmailDTO: SendEmailDTO = {
            recipient: { name: user.username, address: user.email },
            subject: "Reset Password",
            info: `Please click on the link : ${link}`,
        };

        await this.mailService.SendEmail(sendEmailDTO);
        return "Reset link has been sent to your Email, go check it out.";
    }

    async ResetPassword(
        userID: ObjectId,
        newPassword: string
    ): Promise<{ message: string }> {
        await this.userService.UpdateUserPassword(userID, newPassword);
        return { message: "Password has been successfully updated." };
    }
}
