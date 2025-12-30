import { ApiProperty } from '@nestjs/swagger';

export class ReportResponseDto {
  @ApiProperty({
    description: 'Report ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Report title',
    example: 'Monthly Sales Report',
  })
  title!: string;

  @ApiProperty({
    description: 'Report description',
    example: 'Detailed analysis of monthly sales performance',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'User ID who created the report',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId!: string;

  @ApiProperty({
    description: 'Report status',
    example: 'pending',
  })
  status?: string;

  @ApiProperty({
    description: 'Report creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Report last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt?: Date;
}
