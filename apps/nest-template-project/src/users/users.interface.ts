import { User as UserModel } from 'generated/prisma';

export type User = Omit<UserModel, 'password'>;
