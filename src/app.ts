import express from "express";
import { config } from "dotenv";
import userRoute from "./interfaces/http/routes/user";
import contactRoute from "./interfaces/http/routes/contact";

config();

const app = express();
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', contactRoute);

export default app;
