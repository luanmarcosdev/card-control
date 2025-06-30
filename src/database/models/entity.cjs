'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    
    static associate(models) {
      
      Entity.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Entity.hasMany(models.Expense, {
        foreignKey: 'entity_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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