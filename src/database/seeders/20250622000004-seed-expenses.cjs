'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expenses', [
      {
        entity_id: 1,
        expense_category_id: 4,
        description: 'Tênis para academia',
        amount: 299.9,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        entity_id: 1,
        expense_category_id: 4,
        description: 'Casaco de frio',
        amount: 350,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        entity_id: 2,
        expense_category_id: 4,
        description: 'Tênis de sair',
        amount: 199.9,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        entity_id: 2,
        expense_category_id: 3,
        description: 'Show Imagine Dragons',
        amount: 600,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        entity_id: 2,
        expense_category_id: 1,
        description: 'Pizza',
        amount: 80,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};
