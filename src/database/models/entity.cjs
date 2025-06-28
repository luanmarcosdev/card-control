'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    
    static associate(models) {
      
      Entity.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

    }
  }
  Entity.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entity',
    tableName: 'entities_migrations'
  });
  return Entity;
};