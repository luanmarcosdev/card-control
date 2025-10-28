'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entities', [
  {
    id: 1,
    user_id: 1,
    name: 'Carro',
    description: '',
    createdAt: new Date('2025-07-04 17:13:14'),
    updatedAt: new Date('2025-07-04 17:13:14')
  },
  {
    id: 2,
    user_id: 1,
    name: 'Moto',
    description: '',
    createdAt: new Date('2025-07-04 17:13:14'),
    updatedAt: new Date('2025-07-04 17:13:14')
  }
], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entities', null, {});
  }
};
