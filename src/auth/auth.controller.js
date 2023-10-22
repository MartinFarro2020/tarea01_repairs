import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { AppError, catchAsync } from "../errors/index.js"
import { AuthService } from "./auth.service.js"
import { validateLogin, validateRegister } from "./user.schema.js"
import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.plugin.js"


const authService = new AuthService()

export const login = catchAsync(async(req, res, next) =>{
    const { hasError,errorMessages, userData } =validateLogin(req.body)
    
    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
     
    //Aqui se valida que el usuario exista en base de datos
    
    const user = await authService.findOneUserByEmail(userData.email)

    if(!user){
        return next(new AppError('This account does not exist', 404))
        
    }

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    //valida la contraseña si es correcta

    if(!isCorrectPassword){
        return next(new AppError('Incorrecct email o password',401))
    }

    //generar token

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            gender: user.gender
        }

    })

})
export const register = catchAsync(async(req, res, next) =>{
    const {hasError, errorMessages, userData} = validateRegister(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await authService.createUser(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            gender: user.gender
        }
    })

})

export const changePassword = catchAsync(async(req, res, next) =>{
    //1. traerme el usuario

    const { sessionUser } = req;

    //2. traerme los datos de la req.body
    const { currentPassword, newPassword } = req.body;

    //3. validar si la contraseña actual y la nueva son iguales

    if( currentPassword === newPassword){
        return next(new AppError('The password cannot is equals', 401))
    }

    //4. validar si la contraseña actual es igual que la contraseña en base de datos

    const isCorrectPassword = await verifyPassword(
        
        currentPassword,
        sessionUser.password
   
    )

    //valida la contraseña si es correcta

    if(!isCorrectPassword){
        return next(new AppError('Incorrecct email o password',401))
    }

    //5. encriptar la nueva contraseña
    const hashedNewPasswword = await encryptedPassword(newPassword)


    await authService.updateUser(sessionUser,{

        password: hashedNewPasswword,
        changePasswordAt: new Date(),
   
    })

    return res.status(200).json({
        message: 'The user password was updated successfully'
    })
})

export const deleteAccount = catchAsync(async(req, res, next)=>{
    //1. traerme el usuario logueado
    const {user} = req;

    await authService.deleteUser(user)

    res.status(204).json(null)
})