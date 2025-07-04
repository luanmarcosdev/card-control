'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
       name: "Luan Marcos",
       email: "luanmarcosdev@gmail.com",
       password: "",
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       name: "Maysa Beatriz",
       email: "maysabeatriz@gmail.com",
       password: "",
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       name: "Lucia Souza",
       email: "luciasouza@gmail.com",
       password: "",
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       name: "Nivanir José",
       email: "nivanirjose@gmail.com",
       password: "",
       createdAt: new Date(),
       updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
