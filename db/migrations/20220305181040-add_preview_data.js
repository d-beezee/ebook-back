'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('files', "preview", { type: Sequelize.TEXT });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('files', "preview");
  }
};
