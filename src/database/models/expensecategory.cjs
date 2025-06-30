'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
   
    static associate(models) {
      
      ExpenseCategory.hasMany(models.Expense, {
        foreignKey: 'expense_category_id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })

    }
  }
  ExpenseCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExpenseCategory',
    tableName: 'expense_categories_migrations'
  });
  return ExpenseCategory;
};