import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from ".";
import { Transaction } from "../../interfaces/Transaction";

export type TransactionFields = Optional<Transaction, 'id'>;

type TransactionModelCreator = ModelDefined<Transaction, TransactionFields>;

export type TransactionSeqModel = Model<Transaction, TransactionFields>;

const TransactionModel: TransactionModelCreator = db.define('transaction', {
  account_id: DataTypes.INTEGER,
  cashback: DataTypes.DECIMAL(10, 2),
  amount: DataTypes.DECIMAL(10, 2),
  transaction_date: DataTypes.DATE,
}, {
  tableName: 'transactions',
  timestamps: false,
  underscored: true,
});

export default TransactionModel;
