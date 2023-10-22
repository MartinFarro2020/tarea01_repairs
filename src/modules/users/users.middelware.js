import { catchAsync,AppError} from "../../errors/index.js"
import { UserService } from "./users.service.js";

const userService = new UserService()


export const validExistUser = catchAsync(async(req, res, next) => {

    const { id } = req.params;

    const user = await userService.findOne(id)

    if(!user){
        return next(new AppError(`flight with id: ${id} not found!`, 404))
    }   
    
    req.user = user;
    next()
    
});