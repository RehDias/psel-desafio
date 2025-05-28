import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword1 = await bcrypt.hash('teste1234', 10);
    const hashedPassword2 = await bcrypt.hash('1234mudar', 10);
    await queryInterface.bulkInsert('accounts', [
      {
        cpf_cnpj: '123.456.789-88',
        name: 'renata',
        email: 're@teste.com',
        password: hashedPassword1
      },
      {
        cpf_cnpj: '456.852.678-99',
        name: 'pessoa2',
        email: 'pessoa2@teste.com',
        password: hashedPassword2
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('accounts', {});
  }
};