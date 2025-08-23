import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { 
  IsOptional, 
  IsArray, 
  IsString, 
  IsNumber, 
  Min
} from 'class-validator';

// Main Query Options DTO
export class QueryOptionsDto {
  @ApiPropertyOptional({
    description: 'Array of IDs to filter by',
    type: [String],
    example: ['507f1f77bcf86cd799439011', '507f191e810c19729de860ea'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  ids?: string[];

  @ApiPropertyOptional({
    description: 'Fields to include in the response',
    type: [String],
    example: ['id', 'name'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  fields?: string[];

  @ApiProperty({
    description: 'Page number (1-based)',
    default: 1,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Expose()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page: number;
  
  @ApiProperty({
    description: 'Items per page',
    default: 10,
    example: 10,
  })
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @Expose()
  limit: number;

  // @ApiPropertyOptional({
  //   description: 'Relations to populate',
  //   type: [String],
  //   example: ['author', 'comments'],
  // })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // @Type(() => String)
  // relations?: string[];
}