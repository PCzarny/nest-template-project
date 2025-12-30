import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './report.schema';
import { TReport } from './reports.interface';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsRepo {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<Report>,
  ) {}

  async createReport(data: CreateReportDto): Promise<TReport> {
    const createdReport = new this.reportModel(data);
    const savedReport = await createdReport.save();
    return this.mapToReport(savedReport);
  }

  async findById(id: string): Promise<TReport | null> {
    const report = await this.reportModel.findById(id).exec();
    return report ? this.mapToReport(report) : null;
  }

  async findByUserId(userId: string): Promise<TReport[]> {
    const reports = await this.reportModel.find({ userId }).exec();
    return reports.map((report) => this.mapToReport(report));
  }

  async findAll(): Promise<TReport[]> {
    const reports = await this.reportModel.find().exec();
    return reports.map((report) => this.mapToReport(report));
  }

  async updateReport(
    id: string,
    data: Partial<CreateReportDto>,
  ): Promise<TReport | null> {
    const report = await this.reportModel
      .findByIdAndUpdate(id, data, {
        new: true, // return updated document
      })
      .exec();
    return report ? this.mapToReport(report) : null;
  }

  async deleteReport(id: string): Promise<boolean> {
    const result = await this.reportModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private mapToReport(report: ReportDocument): TReport {
    const reportObj = report.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = reportObj;
    return {
      ...rest,
      id: _id.toString(),
    };
  }
}
