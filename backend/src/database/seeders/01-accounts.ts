import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('accounts', [], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('accounts', {});
  }
};