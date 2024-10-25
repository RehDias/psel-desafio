import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        account_id: 1,
        cashback: 0.2,
        amount: 50.0,
        transaction_date: new Date()
      },
      {
        account_id: 2,
        cashback: 0.1,
        amount: 40.0,
        transaction_date: new Date()
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('transactions', {});
  }
};