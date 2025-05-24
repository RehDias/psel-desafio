import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Transaction } from '../../interfaces/Transaction';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Transaction>>('transactions', {
      transactionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      account_id: {
        allowNull: false,
        field: 'account_id',
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'cpf_cnpj',
        },
      },

      cashback: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },

      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },

      transaction_date: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('transactions')
  }
}