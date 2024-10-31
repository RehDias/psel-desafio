import { CreationOptional, DataTypes, InferAttributes, 
  InferCreationAttributes, Model } from "sequelize";
import db from ".";

class TransactionSequelize extends Model<InferAttributes<TransactionSequelize>,
  InferCreationAttributes<TransactionSequelize>> {
    declare id: CreationOptional<number>;
    declare account_id: number;
    declare cashback: number;
    declare amount: number;
    declare transaction_date: Date;
}

TransactionSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  cashback: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull:false,
  },

  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
})

export default TransactionSequelize;
