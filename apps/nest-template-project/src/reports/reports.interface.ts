import { Report } from './report.schema';

export type TReport = Omit<Report, '_id' | '__v'> & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
