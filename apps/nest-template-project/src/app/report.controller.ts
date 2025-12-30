import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { RequirePermissions, Permission } from 'src/auth/permissions.decorator';
import { ReportsRepo } from '../reports/reports.repo';
import { CreateReportDto } from '../reports/dto/create-report.dto';
import { UpdateReportDto } from '../reports/dto/update-report.dto';
import { ReportResponseDto } from '../reports/dto/report-response.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportsRepo: ReportsRepo) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({
    status: 201,
    description: 'Report created successfully',
    type: ReportResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.CREATE_REPORT)
  async createReport(
    @Body() createReportDto: CreateReportDto,
  ): Promise<ReportResponseDto> {
    return this.reportsRepo.createReport(createReportDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({
    status: 200,
    description: 'List of all reports',
    type: [ReportResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.READ_REPORT)
  async findAll(): Promise<ReportResponseDto[]> {
    return this.reportsRepo.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a report by ID' })
  @ApiParam({
    name: 'id',
    description: 'Report ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Report found',
    type: ReportResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.READ_REPORT)
  async findById(@Param('id') id: string): Promise<ReportResponseDto> {
    const report = await this.reportsRepo.findById(id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  @Get('user/:userId')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all reports for a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'List of reports for the user',
    type: [ReportResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.READ_REPORT)
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<ReportResponseDto[]> {
    return this.reportsRepo.findByUserId(userId);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a report' })
  @ApiParam({
    name: 'id',
    description: 'Report ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Report updated successfully',
    type: ReportResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.UPDATE_REPORT)
  async updateReport(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportResponseDto> {
    const report = await this.reportsRepo.updateReport(id, updateReportDto);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a report' })
  @ApiParam({
    name: 'id',
    description: 'Report ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Report deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.DELETE_REPORT)
  async deleteReport(@Param('id') id: string): Promise<void> {
    const deleted = await this.reportsRepo.deleteReport(id);
    if (!deleted) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
  }
}
