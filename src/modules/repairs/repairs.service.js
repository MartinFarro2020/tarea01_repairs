import Repair from "./repairs.model.js";

export class RepairService{


    async findOne(id){
        return await Repair.findOne({
            where:{
                id,
                status: 'pending'
            }
        })

    }

    
    async findAll(){
        return await Repair.findAll({
            where:{
                status: 'pending'
            }
        })

    }

    async create(repairData){
        return await Repair.create(repairData)

    }


    async update(repair, repairData){
        return await repair.update({status:'completed'})
    }


    async delete(repair){
        return await repair.update({ status: 'cancelled' })
    }

}

