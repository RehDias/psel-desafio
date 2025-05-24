import { Sequelize } from 'sequelize';
import AccountSequelize from './models/account.model';
import TransactionSequelize from './models/transaction.model'; 

export const sequelizeTest = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

export async function initDbTest() {
  AccountSequelize.init(AccountSequelize.getAttributes(), {
    sequelize: sequelizeTest,
    modelName: 'accounts',
    tableName: 'accounts',
    timestamps: false,
  });

  TransactionSequelize.init(TransactionSequelize.getAttributes(), {
    sequelize: sequelizeTest,
    modelName: 'transactions',
    tableName: 'transactions',
    timestamps: false,
  });

  await sequelizeTest.sync({ force: true });
}
