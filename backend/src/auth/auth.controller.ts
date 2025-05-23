import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { SignUpDTO } from "./dto/signup.dto";
import { ResetPasswordGuard } from "./guards/resetPassword.guard";
import { EditPasswordDTO } from "./dto/editPassword.dto";
import { ForgotPasswordDTO } from "./dto/forgotPassword.dto";
import { AuthenticationRequest } from "src/types/AuthenticationRequest";
import { ObjectId } from "typeorm";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async logIn(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        return await this.authService.Login(loginDTO);
    }

    @Post("signup")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async signUp(
        @Body() signUpDTO: SignUpDTO
    ): Promise<{ accessToken: string }> {
        return await this.authService.Signup(signUpDTO);
    }

    @Post("forgot-password")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async forgetPassword(@Body() info: ForgotPasswordDTO) {
        return await this.authService.RequestForgotPassword(info.email);
    }

    @Post("reset-password/:token")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @UseGuards(ResetPasswordGuard)
    async editPassword(
        @Body() info: EditPasswordDTO,
        @Req() request: AuthenticationRequest
    ) {
        const userId: ObjectId = request["userId"];
        return await this.authService.ResetPassword(userId, info.newPassword);
    }
}
