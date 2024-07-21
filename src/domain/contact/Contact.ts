import { Document, Types } from "mongoose";

export interface IContact extends Document {
	id?: Types.ObjectId;
	userId: Types.ObjectId;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export class Contact {
	constructor(
		public userId: Types.ObjectId,
		public firstName: string,
		public lastName: string,
		public phoneNumber: string,
		public id?: Types.ObjectId
	) {}
}
