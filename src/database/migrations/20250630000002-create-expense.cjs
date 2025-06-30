'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses_migrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'entities_migrations', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      expense_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'expense_categories_migrations', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses_migrations');
  }
};