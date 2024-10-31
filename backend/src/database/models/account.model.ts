import { CreationOptional, DataTypes, InferAttributes, 
  InferCreationAttributes, Model } from "sequelize";
import db from ".";

class AccountSequelize extends Model<InferAttributes<AccountSequelize>,
  InferCreationAttributes<AccountSequelize>> {
    declare id: CreationOptional<number>;
    declare cpf_cnpj: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare account_status: boolean;
}

AccountSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  cpf_cnpj: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull:false,
  },

  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  account_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
})

export default AccountSequelize;
