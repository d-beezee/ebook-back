"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      path: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Files");
  },
};
