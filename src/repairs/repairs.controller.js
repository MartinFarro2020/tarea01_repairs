import { RepairService } from "./repairs.service.js"

const repairService = new RepairService();

export const createRepair = async(req,res) =>{
    try {
         const repair = await repairService.createRepair(req.body)
         return res.status(201).json(repair)
 
    } catch (error) {
      return res.status(500).json(error)    
    }
}

export const findAllRepairs = async (req, res) => {
    try {
        const repair = await repairService.findAllRepairs()
        return res.json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneUsers = async (req, res) => {
    try {
        const {id}=req.params;

        const user = await repairService.findOneUsers(id)

        if(!user){
            return res.status(404).json({
                status:'error',
                message: `User with id: ${id} not found`
            })
        }

        return res.json(user)

    } catch (error) {
        return res.status(500).json(error)
    }  
}

export const findOneRepair = async (req, res) => {
    try {
        const {id}=req.params;

        const repair = await repairService.findOneRepair(id)

        if(!repair){
            return res.status(404).json({
                status:'error',
                message: `User with id: ${id} not found`
            })
        }

        return res.json(repair)

    } catch (error) {
        return res.status(500).json(error)
    }  
}



export const updateRepair = async(req, res) => {
    try {

        const {id} = req.params;

        const repair = await repairService.findOneRepair(id)

        if(!repair){
            return res.status(404).json({
              status:'error',
              message:`user with id: ${id} not found`
          })
         }

        const updatedRepair = await repairService.updateUser(repair, req.body)

    return res.json(updatedRepair)
    } catch (error) {
        return res.status(500).json(error)
    }
}



export const deleteRepair = async(req, res) => {

    try {
        const {id} = req.params;
    //const id = req.params.id esto es lo mismo que lo de arriba

    const user =await repairService.findOneUsers(id)

    if(!user){
        return res.status(404).json({
            status:'error',
            message:`User with id ${id} not found`
        })
    }

    await repairService.deleteRepair(user)

    return res.status(404).json(null)
    } catch (error) {
      return res.status(500).json(error)  
    }

}