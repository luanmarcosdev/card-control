'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cards.init({
    family_members_id: DataTypes.INTEGER,
    last_four_digits: DataTypes.STRING,
    due_day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
    tableName: 'cards_migrations'
  });
  return Card;
};