import { Role } from 'generated/prisma';

export type TokenPayload = {
  sub: string; // user id
  email: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export type LoggedInUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};
