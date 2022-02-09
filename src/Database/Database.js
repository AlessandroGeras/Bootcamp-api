import Sequelize from "sequelize";

const sequelize = new Sequelize('database','username','password',{
    dialect:'sqlite',
    host:'./src/Database/database.sqlite',
    logging: false}
)

export default sequelize;