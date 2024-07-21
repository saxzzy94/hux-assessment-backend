import { Document, Types } from "mongoose";

export interface IUser extends Document {
	email: string;
	password: string;
	_id?: Types.ObjectId;
}

export class User {
	constructor(
		public email: string,
		public password: string,
		public _id?: Types.ObjectId
	) {}
}
