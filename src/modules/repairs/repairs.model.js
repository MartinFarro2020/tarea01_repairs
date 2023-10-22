import { DataTypes } from "sequelize"
import sequelize from "../../config/database/database.js"

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
        defaultValue: 'pending',
      },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      }, 

})

export default Repair