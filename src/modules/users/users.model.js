import { DataTypes } from "sequelize"
import sequelize from "../../config/database/database.js"

const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('client','employee'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available','disabled'),
      allowNull: false,
      defaultValue: 'available'
    } 
})

export default User