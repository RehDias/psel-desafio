import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Transaction } from '../../types/Transaction';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Transaction>>('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      account_id: {
        allowNull: false,
        field: 'account_id',
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id',
        },
      },

      cashback: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },

      transaction_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('transactions')
  }
}