import { catchAsync,AppError} from "../../errors/index.js"
import { RepairService } from "./repairs.service.js"

const repairService = new RepairService()

export const validExistRepair = catchAsync(async(req,res,next) =>{
    
        const { id } = req.params;
         
        const repair = await repairService.findOne(id);

        if(!repair){
            return next(new AppError(`flight with id: ${id} not found!`, 404))
        }

        req.repair = repair;
        next()

    });