import Repair from "./repairs.model.js";

export class RepairService{


    async findOneRepair(id){
        return await Repair.findOneRepair({
            where:{
                id,
                status: 'pending'
            }
        })

    }

    
    async findAllRepairs(){
        return await Repair.findAll({
            where:{
                status: 'pending'
            }
        })

    }

    async createRepair(repairData){
        return await Repair.create(repairData)

    }


    async updateRepair(repair, repairData){
        return await repair.update(repairData)
    }


    async deleteRepair(repair){
        return await repair.update({ status: 'cancelled' })
    }

}

