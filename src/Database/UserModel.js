import {Model,DataTypes} from "sequelize";
import sequelize from "./Database.js";

class User extends Model {}

User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type:DataTypes.STRING},
    password:{
        type:DataTypes.STRING},    
    CSS:{
        type:DataTypes.BOOLEAN},    
    JS:{
        type:DataTypes.BOOLEAN},    
    ReactJS:{
        type:DataTypes.BOOLEAN},    
    SQL:{
        type:DataTypes.BOOLEAN},
    },
    {
    sequelize,modelName:"user"
    }
)

export default User;