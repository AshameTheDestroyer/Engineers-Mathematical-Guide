import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { LocalString } from 'src/utils/local-string';
import { UserGender, UserRole } from 'src/utils/types';

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
  
  @ValidateNested()
  @Type(() => LocalString)
  @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
  name: LocalString;
  
  @ValidateNested()
  @Type(() => LocalString)
  @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
  surname: LocalString;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;
  
  @ValidateNested()
  @Type(() => LocalString)
  @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
  bio: LocalString;

  @ApiProperty({ 
    enum: UserGender, 
    example: UserGender.MALE
  })
  @IsEnum(UserGender, { message: 'Invalid UserGender male OR female' })
  @IsNotEmpty({ message: 'UserGender is required' })
  gender: UserGender

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

  role: UserRole = UserRole.USER
}
