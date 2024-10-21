import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('transactions', [], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('transactions', {});
  }
};