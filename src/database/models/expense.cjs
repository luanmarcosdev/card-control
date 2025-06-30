'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
   
    static associate(models) {
      
      Expense.belongsTo(models.Entity, {
        foreignKey: 'entity_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Expense.belongsTo(models.ExpenseCategory, {
        foreignKey: 'expense_category_id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      })

    }
  }
  Expense.init({
    entity_id: DataTypes.INTEGER,
    expense_category_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2),
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expense_migrations'
  });
  return Expense;
};