import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: false, default: 'pending' })
  status?: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
