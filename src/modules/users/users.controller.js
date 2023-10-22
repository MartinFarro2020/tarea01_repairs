import { catchAsync, AppError } from '../../errors/index.js'
import { validateUser, validatePartialUser } from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService()

export const findAllUsers = catchAsync(async(req, res,next) => {
    
        const users = await userService.findAllUsers()
        return res.status(200).json(users)
    
});

export const createUser = catchAsync(async(req, res, next) => {
    
    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
        return res.status(422).json({
          status: 'error',
          message: errorMessages,
        });
    }

        const user = await userService.createUser(userData)
        return res.status(201).json(user);
    
});

export const findOneUsers = catchAsync(async (req, res,next) => {
            
        const { user } = req;
        return res.status(200).json(user)
        
});

 export const updateUser = catchAsync(async(req, res, next) => {

        const { email, name } = req.body;
        const { user } = req; 

        const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
   
  const updateUser = await userService.updateUser(user,{email,name})
        return res.status(200).json(updateUser)

});

export const deleteUser = catchAsync(async(req, res, next) => {

        const { user } = req;
        await userService.deleteUser(user)
        return res.status(204).json(null)

});
