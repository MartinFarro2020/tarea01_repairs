import Repair from "./repairs.model.js";
import User from "../users/users.model.js"
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


    async findAllWithAllData(){
        return await Repair.findAll({
            where:{
                status:{
                    [Op.notIn]:['pending','completed']
                },
            },
            include:[
                {
                    model: User,
                    as: 'repairBelongsUser',
                    attributes:['name']
                }
            ]
        });
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

