const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.linked = require("./linked.model.js")(sequelize, Sequelize);
db.appreminder = require("./appreminder.model.js")(sequelize, Sequelize);
db.medreminder = require("./medreminder.model.js")(sequelize, Sequelize);

// checking the contents of db array
console.log(db);

module.exports = db;