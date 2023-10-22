import { catchAsync, AppError } from '../../errors/index.js'
import { validateRepair, validatePartialRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js"

const repairService = new RepairService();


export const findAllRepairs = catchAsync(async (req, res,next) => {
    
        const repair = await repairService.findAllRepairs()
        return res.status(200).json(repair)
    
});


export const createRepair = catchAsync(async(req,res,next) =>{
    
    const { hasError, errorMessages, repairData } = validateRepair(req.body);

    if (hasError) {
        return res.status(422).json({
          status: 'error',
          message: errorMessages,
        });
    }

         const repair = await repairService.createRepair(repairData)

         return res.status(200).json(repair);

});


export const findOneRepair = catchAsync(async (req, res, next) => {
    
        const { repair } = req;

        return res.status(200).json(repair)
   
});


export const updateRepair = catchAsync(async(req, res,next) => {
    
    const { repair } = req;

    const { hasError, errorMessages, repairData } = validatePartialRepair(req.body);

    if (hasError) {
        return res.status(422).json({
        status: 'error',
        message: errorMessages,
        });
    }
   
    const updatedRepair = await repairService.update(repair, repairData);

    return res.status(200).json(updatedRepair);
});


export const deleteRepair = catchAsync(async(req, res) => {

    const { repair } = req;

    await repairService.deleteRepair(repair)

    return res.status(204).json(null)

});