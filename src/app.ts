import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

const mongoUri: string | undefined = process.env.MONGODB_URI;
if (!mongoUri) {
	throw new Error("Connection string missing");
}

mongoose
	.connect(mongoUri,{})
	.then(() => console.log("Database connected successfully"))
	.catch((err: Error) => console.error("Database connection error:", err));

export default app;
