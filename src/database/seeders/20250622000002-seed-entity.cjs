'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entities', [
      {
        user_id: 1,
        name: 'Maysa Beatriz',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        name: 'Luan Marcos',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        name: 'Biz 100',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        name: 'New Fiesta',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        name: 'Casa',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entities', null, {});
  }
};
