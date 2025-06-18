'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entity.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    entity_types: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entity',
    tableName: 'entientities_migrations'
  });
  return Entity;
};