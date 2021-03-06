https://github.com/rsamhollyer/me-read'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AuthorId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Authors',
          key: 'id',
          as: 'AuthorId'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      copyright: {
        type: Sequelize.INTEGER
      },
      totalpages: {
        type: Sequelize.INTEGER
      },
      currentpage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};