import Repair from "./repairs.model.js"

export class RepairService{

    async createRepair(data){
        return await Repair.create(data)

    }

    async findOneUsers(id){
        return await Repair.findOne({
            where:{
                userid:id,
            }
        })

    }

    async findOneRepair(id){
        return await Repair.findOne({
            where:{
                id,
            }
        })

    }


    async findAllRepairs(){
        return await Repair.findAll({
            where:{
                status:pending
            }
        })

    }

    async updateRepair(repair,data){
        return await repair.update(data)
    }



    async deleteRepair(user){
        return await user.update({status:cancelled})
    }

}

