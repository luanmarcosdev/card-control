'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entities_migrations', [
      {
        user_id: 1,
        name: 'Maysa Beatriz',
        entity_type_id: 1,
        createdAt: new Date()
      },
      {
        user_id: 1,
        name: 'Luan Marcos',
        entity_type_id: 1,
        createdAt: new Date()
      },
      {
        user_id: 1,
        name: 'Biz 100',
        entity_type_id: 3,
        createdAt: new Date()
      },
      {
        user_id: 1,
        name: 'New Fiesta',
        entity_type_id: 3,
        createdAt: new Date()
      },
      {
        user_id: 1,
        name: 'Casa',
        entity_type_id: 2,
        createdAt: new Date()
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entities_migrations', null, {});
  }
};
