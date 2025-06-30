'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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