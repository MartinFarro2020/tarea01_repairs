import { DataTypes } from "sequelize"
import sequelize from "../config/database/database.js"

const Repair = sequelize.define('repair', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field:'repair_id',
      },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    status: {
        type: DataTypes.ENUM('pending','completed','cancelled'),
        allowNull: false,
      },
    userid: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
      }, 

})

export default Repair