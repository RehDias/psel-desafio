// utils/accountHelper.ts
import AccountModel from "../models/AccountModel";
import NotFoundError from "../errors/NotFoundError";
import { Account } from "../interfaces/Account"; // ou tipo equivalente
import TransactionService from "../services/transaction";
import { Transaction } from "../interfaces/Transaction";

export async function getValidatedAccount(id: number): Promise<Partial<Account>> {
  const accountModel = new AccountModel();
  const account = await accountModel.findById(id);

  if (!account) {
    throw new NotFoundError('Conta não encontrada');
  }

  return account;
}

export async function getValidatedTransaction(
  service: TransactionService,
  accountCpfCnpj: string,
  transactionId: number
): Promise<Transaction> {
  const transaction = await service.findOne(accountCpfCnpj, transactionId);

  if (!transaction || !transaction.transactionId) {
    throw new NotFoundError('Transação não encontrada ou não pertence à conta');
  }

  return transaction as Transaction;
}