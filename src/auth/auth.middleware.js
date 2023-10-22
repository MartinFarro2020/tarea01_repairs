import { envs} from "../config/enviroments/enviroment.js";
import { AppError, catchAsync } from "../errors/index.js";
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

//La funcion protect protege una ruta para que los usuarios no puedan acceder sin autorizacion
export const protect = catchAsync(async(req, res, next)=>{

    //1. obtener el token

    let token;

    
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    
      ){
        token=req.headers.authorization.split(' ')[1];
      }

    //2. valida si el token existe
      if(!token){
        return next(
            new AppError('You are not logged in!, Please log in to get access',401)
        )
        
    }
    //3. decodificar el token
    const decoded =  await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED,
    )
        console.log(decoded);

    //4. buscar el usuario dueño del token

    const user = await authService.findOneUserById(decoded.id)

    if(!user){
        return next(
            new AppError('The owner of this token is not longer available',401)
        )
    }
    

    //5.validacion del cambio de contraseña recientemente

    if(user.chagedPasswordAt){
        const changedTimeStamp = parseInt(
            user.changedPasswordAt.getTime()/100,10
        )
        
        if(decoded.iat < changedTimeStamp){
            return next(
                new AppError('User recently changed password!, please login again.',401)
            )
        }
    }

    //6.adjuntar el usuario en sesion, el usuario en sesion es el usuario

    req.sessionUser = user;
    next();

    //7.

})


export const restrictTo = (...roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.sessionUser.role)){
            return next(new AppError('You do not have permission to perform this action',403))
        }
        next();
    }

}

export const protectAccountOwner = (req,res,next) => {
    const {user, sessionUser} = req;

    if( user.id !== sessionUser.id){
        return next(new AppError('You do not own this account',401))
    }

    next()
    
}

export const validExistUser = catchAsync(async(req,res,next) => {
    const { id } = req.params;

    const user = await authService.findOneUserById(id)

    if(!user){
        return next(new AppError('User not found',404))
    }

    req.user = user;
    next()

})