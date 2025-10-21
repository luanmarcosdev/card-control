'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    static associate(models) {

      ExpenseCategory.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      ExpenseCategory.hasMany(models.Expense, {
        foreignKey: 'expense_category_id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  ExpenseCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExpenseCategory',
    tableName: 'expense_categories'
  });
  return ExpenseCategory;
};