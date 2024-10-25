import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Account } from '../../interfaces/Account';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Account>>('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      
      cpf_cnpj: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      account_status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('accounts')
  }
};