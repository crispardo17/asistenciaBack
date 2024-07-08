const serverApp = require("./app");
const sequelize = require("./db/sequelize");
const { initApp_Db, recurringWorks } = require("./libs/initialSetUp");
initApp_Db({ sequelize, serverApp });
recurringWorks({ hour: 4, minute: 45 });
