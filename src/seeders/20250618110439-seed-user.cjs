'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users_Migrations', [
      {
       name: "Luan Marcos",
       email: "luanmarcosdev@gmail.com",
       password_hash: "",
       createdAt: new Date()
      },
      {
       name: "Maysa Beatriz",
       email: "maysabeatriz@gmail.com",
       password_hash: "",
       createdAt: new Date()
      },
      {
       name: "Lucia Souza",
       email: "luciasouza@gmail.com",
       password_hash: "",
       createdAt: new Date()
      },
      {
       name: "Nivanir José",
       email: "nivanirjose@gmail.com",
       password_hash: "",
       createdAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users_Migrations', null, {});
  }
};
