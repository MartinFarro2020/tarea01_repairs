import User from "../../modules/users/users.model.js";
import user from "../../auth/user.model.js";
import Repair from "../../modules/repairs/repairs.model.js";

export const initModel = () => {

    User.hasMany(Repair, {foreignKey:'user_id', as: 'userCreateRepair'})
    Repair.belongsTo(User, { foreignKey: 'user_id', as: 'repairBelongsUser'})


}