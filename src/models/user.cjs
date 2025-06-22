'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.hasMany(models.Entity, {
        foreignKey: 'user_id'
      })
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users_migrations'
  });
  return User;
};