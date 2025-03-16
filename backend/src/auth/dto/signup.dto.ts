import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  sirName: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
