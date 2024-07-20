import mongoose from 'mongoose';
import { IDatabase } from './IDatabase';

export class MongoDatabase implements IDatabase {
  constructor(private uri: string) {}

  async connect(): Promise<void> {
    await mongoose.connect(this.uri);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}