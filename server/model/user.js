const Sequelize = require('sequelize');
var sequelize = require('../config/config');

const User = sequelize.define('user', {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
        type: Sequelize.BOOLEAN
      },
    area  : {
        type: Sequelize.STRING,
        allowNull: false
      },
    zip: {
        type: Sequelize.STRING,
        allowNull: false
    },
  }, {
    // options
  });
  User.associate = function(models){
    models.users.hasMany(models.images);
    
};
  module.exports=User;