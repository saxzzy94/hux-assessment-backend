import express from "express";
import { config } from "dotenv";
import routes from "./interfaces/http/routes";

config();

const app = express();
app.use(express.json());

app.use('/api', routes);

export default app;
