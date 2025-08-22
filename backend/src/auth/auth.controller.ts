import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
import { ResetPasswordGuard } from './guards/resetPassword.guard';
import { EditPasswordDTO } from './dto/editPassword.dto';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { AuthRequest } from 'src/utils/types';
import { ObjectId } from 'typeorm';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({type: LoginDTO})
  @ApiResponse({ status: 200, description: 'Logged in', example:{accessToken: "Bearer:OJFJOIJ(J)#@JFJOIFJOIJEFOIJ(#JFJ(J#OIJFEPOFJPJ"} })
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async logIn(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    return await this.authService.logIn(loginDTO);
  }
  
  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: SignUpDTO})
  @ApiResponse({ status: 200, description: 'Signed Up', example:{accessToken: "Bearer:OJFJOIJ(J)#@JFJOIFJOIJEFOIJ(#JFJ(J#OIJFEPOFJPJ"}})
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
  FileFieldsInterceptor([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }],
  multerConfig))
  async signUp(
    @Body() signUpDTO: SignUpDTO,
    @UploadedFiles() files: { 
    profileImage?: Express.Multer.File[], 
    coverImage?: Express.Multer.File[] 
  },
  ): Promise<{ accessToken: string }> {
    const profileImage = files.profileImage?.[0].filename || "";
    const coverImage = files.coverImage?.[0].filename || "";
    return await this.authService.signUp({...signUpDTO,profileImage,coverImage});
  }
  
  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiBody({type: ForgotPasswordDTO})
  @ApiResponse({ status: 200, description: 'Email sent', example:{message:'Reset Link Has Been Sent To Your Email Check It Out'}})
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async forgetPassword(@Body() info: ForgotPasswordDTO) : Promise<{message:string}> {
    return await this.authService.forgetPassword(info.email);
  }
  
  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reset Password' })
  @ApiBody({type: EditPasswordDTO})
  @ApiResponse({ status: 200, description: 'Password Updated', example: {message:'Reset Link Has Been Sent To Your Email Check It Out'}})
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(ResetPasswordGuard)
  async editPassword(
    @Body() info: EditPasswordDTO,
    @Req() request: AuthRequest,
  ) : Promise<{message:string}> {
    const userId: ObjectId = request['userId'];
    return await this.authService.resetPassword(userId, info.newPassword);
  }
}
