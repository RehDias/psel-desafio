import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from ".";
import { Account } from "../../types/Account";

export type AccountFields = Optional<Account, 'id' | 'account_status'>;

type AccountModelCreator = ModelDefined<Account, AccountFields>;

export type AccountSeqModel = Model<Account, AccountFields>;

const AccountModel: AccountModelCreator = db.define('account', {
  cpf_cnpj: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  tableName: 'accounts',
  timestamps: false,
  underscored: true,
});

export default AccountModel;
