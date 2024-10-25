import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
      cpf_cnpj: '123.456.789-88',
      name: 'renata',
      email: 're@teste.com',
      password: 'teste123',
      account_status: true,
    },
    {
      cpf_cnpj: '456.852.678-99',
      name: 'pessoa2',
      email: 'pessoa2@teste.com',
      password: '123mudar',
      account_status: true,
    },
  ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('accounts', {});
  }
};