'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expenses', [
      {
        id: 1,
        entity_id: 1,
        expense_category_id: 1,
        description: 'Tênis para academia',
        amount: 399.9,
        date: new Date('2024-02-02 00:00:00'),
        createdAt: new Date('2025-07-04 17:13:14'),
        updatedAt: new Date('2025-10-24 13:06:55')
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};
