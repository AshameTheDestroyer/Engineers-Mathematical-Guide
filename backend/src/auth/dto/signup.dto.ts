import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  
  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;
  
  @IsString()
  @IsOptional()
  bio: string;

  @IsOptional()
  @ApiProperty({ 
    type: 'string', 
    format: 'binary',
    description: 'Profile image file (optional)',
    required: false
  })
  profileImage: any;

  @IsOptional()
  @ApiProperty({ 
    type: 'string', 
    format: 'binary',
    description: 'Cover image file (optional)',
    required: false
  })
  coverImage: any;

  followersCount: number = 0
  
  followeeCount: number = 0
}
