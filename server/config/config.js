const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('testDB', 'root', '123123', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.sync().catch((err) => {
  
    console.log(err);
  })

  module.exports=sequelize;
