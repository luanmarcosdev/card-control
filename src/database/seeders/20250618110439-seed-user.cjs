'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: "Test User",
        email: "user@example.com",
        password: "$2b$10$JBF7zZ4iUDml0KImSm6dFewwNjKVq5dgAUTSOLoXS0xaJzJ0SuTgW",
        createdAt: new Date("2025-07-04 17:13:14"),
        updatedAt: new Date("2025-10-24 13:06:55")
      },
      {
        id: 2,
        name: "Teste User 2",
        email: "user1@example.com",
        password: "$2b$10$JBF7zZ4iUDml0KImSm6dFewwNjKVq5dgAUTSOLoXS0xaJzJ0SuTgW",
        createdAt: new Date("2025-07-06 22:08:09"),
        updatedAt: new Date("2025-07-06 22:08:09")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
