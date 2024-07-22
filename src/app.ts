import express from "express";
import { config } from "dotenv";
import userRoute from "./interfaces/http/routes/user";
import contactRoute from "./interfaces/http/routes/contact";
import { setupSwagger } from "./swagger";
import cors from 'cors'

config();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api', userRoute);
app.use('/api', contactRoute);

setupSwagger(app);
export default app;
