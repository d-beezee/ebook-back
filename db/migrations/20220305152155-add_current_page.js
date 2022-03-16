'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('files', "current", { type: Sequelize.INTEGER,defaultValue:0 });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('files', "current");
  }
};
