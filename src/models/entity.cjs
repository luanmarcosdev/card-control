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

      Entity.hasMany(models.Card, {
        foreignKey: 'entity_id'
      })

      Entity.belongsTo(models.EntityTypes, {
        foreignKey: 'entity_type_id'
      })

    }
  }
  Entity.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    entity_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entity',
    tableName: 'entities_migrations'
  });
  return Entity;
};