import express from "express";
import { router } from './routes/routes.js';
import { AppError } from "./errors/appError.js";
import morgan from "morgan";
import { envs } from "./config/enviroments/enviroment.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { enableCors } from "./config/plugins/cors.plugins.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";



const app = express();

const ACCEPTED_ORIGINS = ['http://localhost:8080','http://localhost:3400']

//TODO ESTO ME PERMITE RECIBIR INFORMACION EN FORMATO JSON POR EL BODY
app.use(express.json())

if(envs.NODE_ENV === 'development'){
    
    enableMorgan(app)

}

enableCors(app, ACCEPTED_ORIGINS)

//app.use("/api/v1",usersRouter)

app.use("/api/v1",router)  

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404))    
})

app.use(globalErrorHandler)


export default app;
