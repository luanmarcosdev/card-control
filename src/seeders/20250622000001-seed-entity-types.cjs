'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entity_types_migrations', [
      {
        name: 'Pessoa',
        description: '',
        createdAt: new Date()
      },
      {
        name: 'Casa',
        description: '',
        createdAt: new Date()
      },
      {
        name: 'Veiculo',
        description: '',
        createdAt: new Date()
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entity_types_migrations', null, {});
  }
};
