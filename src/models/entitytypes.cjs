'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntityTypes extends Model {

    static associate(models) {
      
      EntityTypes.hasMany(models.Entity, {
        foreignKey: 'entity_type_id'
      })
    
    }
  }
  EntityTypes.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EntityTypes',
    tableName: 'entity_types_migration'
  });
  return EntityTypes;
};