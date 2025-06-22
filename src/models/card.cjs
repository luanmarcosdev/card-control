'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {

    static associate(models) {
      
      Card.belongsTo(models.Entity, {
        foreignKey: 'entity_id'
      })

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