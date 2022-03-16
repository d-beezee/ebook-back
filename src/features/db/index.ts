import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.json')[env];

const sequelize = new Sequelize(config);
const db = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

export default db;
export { sequelize };
