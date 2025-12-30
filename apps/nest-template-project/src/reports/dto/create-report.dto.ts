import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'Report title',
    example: 'Monthly Sales Report',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @ApiProperty({
    description: 'Report description',
    example: 'Detailed analysis of monthly sales performance',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'User ID who created the report',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId!: string;

  @ApiProperty({
    description: 'Report status',
    example: 'pending',
    required: false,
    default: 'pending',
  })
  @IsString()
  @IsOptional()
  status?: string;
}
