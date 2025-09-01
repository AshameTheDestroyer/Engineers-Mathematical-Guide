import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { LocalString } from 'src/utils/local-string';
import { UserGender, UserRole } from 'src/utils/types';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
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
  country: string;

  @IsString()
  @IsOptional()
  profileImage: string;
  
  @IsString()
  @IsOptional()
  coverImage: string;

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

  @ApiProperty({ 
      enum: UserRole, 
      example: UserRole.USER
  })
  @IsEnum(UserRole, { message: 'Invalid UserRole male OR female' })
  @IsNotEmpty({ message: 'UserRole is required' })
  role: UserRole

  @IsOptional()
  salt?: string;
}
