'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expense_categories', [
      {
        id: 1,
        name: 'Alimentação',
        user_id: 1,
        createdAt: new Date('2025-07-04 17:13:14'),
        updatedAt: new Date('2025-07-04 17:13:14')
      },
      {
        id: 2,
        name: 'Vestuário',
        user_id: 1,
        createdAt: new Date('2025-07-04 17:13:14'),
        updatedAt: new Date('2025-10-21 18:38:21')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expense_categories', null, {});
  }
};
