import { envs } from "../config/enviroments/enviroment.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";


const handleCastError22001 = () =>
    new AppError('value too long for type on attribute',400)

const handleCastError23505 = () =>
    new AppError('Duplicate field value: please use another value',400)

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please login again', 401)

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })

}

const sendErrorProd = async(err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack,
    })

    if(err.isOperational){
        //operatinal, trusted error:send messaje to client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        //programing or other unknowm error: don't like error detail
        console.log("ERROR 🎁",err);
        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!'
        })
    }
}

export const globalErrorHandler = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'

    if(envs.NODE_ENV === 'development'){
        sendErrorDev(err, res)
    } 

    if(envs.NODE_ENV === 'production'){
        let error = err;
        if(err.parent?.code === '22001') error = handleCastError22001();
        if(err.parent?.code === '23505') error = handleCastError23505();
        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError();
        
        sendErrorProd(error, res)
    }

    
}