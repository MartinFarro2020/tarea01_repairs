import express from "express";
import { router } from './routes/routes.js';


const app = express();

//TODO ESTO ME PERMITE RECIBIR INFORMACION EN FORMATO JSON
app.use(express.json())

//app.use("/api/v1",usersRouter)

app.use("/api/v1",router)

export default app;
