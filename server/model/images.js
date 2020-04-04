const Sequelize = require('sequelize');
var sequelize = require('../config/config');

const Images = sequelize.define('images', {
    // attributes
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    // options
  });
  Images.associate = function(models){
    models.images.belongsTo(models.user);
    
};
  module.exports=Images;