import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  
  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
