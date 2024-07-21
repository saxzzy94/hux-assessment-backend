import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../domain/user/User';


const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);