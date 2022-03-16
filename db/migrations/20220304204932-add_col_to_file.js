'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('files', "base64", { type: Sequelize.TEXT });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('files', "base64");
  }
};
