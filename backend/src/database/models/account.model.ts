import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from ".";
import { Account } from "../../interfaces/Account";

export type AccountFields = Optional<Account, 'id'>;

type AccountModelCreator = ModelDefined<Account, AccountFields>;

export type AccountSeqModel = Model<Account, AccountFields>;

const AccountSequelizeModel: AccountModelCreator = db.define('account', {
  cpf_cnpj: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  account_status: DataTypes.BOOLEAN,
}, {
  tableName: 'accounts',
  timestamps: false,
  underscored: true,
});

export default AccountSequelizeModel;
