'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('BlogPosts', 'userId', {
    type: Sequelize.INTEGER,
    field: 'userId',
    references: {
      model: 'Users',
      key: 'userId',
    },
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BlogPosts', 'userId');
  }
};