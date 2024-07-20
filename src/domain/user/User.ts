import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

export class User {
  constructor(
    public email: string,
    public password: string
  ) {}
}