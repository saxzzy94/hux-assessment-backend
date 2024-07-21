import mongoose, { Schema } from 'mongoose';
import { IContact } from '../../../domain/contact/Contact';

const contactSchema = new Schema<IContact>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  });
  
  export const ContactModel = mongoose.model<IContact>('Contact', contactSchema);