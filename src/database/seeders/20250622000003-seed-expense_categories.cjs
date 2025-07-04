'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expense_categories', [
      {
        name: 'Alimentação',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transporte',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lazer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestuário',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Saúde',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expense_categories', null, {});
  }
};
