import { NextFunction, Request, Response } from "express";
import { Transaction } from "../interfaces/Transaction";
import Service from "../services/service";
import TransactionService from "../services/transaction";
import Controller from "./controller";
import { getValidatedAccount, getValidatedTransaction } from "../utils/accountHelper";

export default class TransactionController extends Controller<Transaction> {
  constructor(service: Service<Transaction> = new TransactionService) {
    super(service);
  } 

  async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const obj = req.body;
        
        const account = await getValidatedAccount(Number(id));
        
        const newTransaction = await this.service.create({
          ...obj, 
          account_id: account.cpf_cnpj as string,
          transaction_date: Date.now(),
        });
    
        return res.status(201).json({ transactionId: newTransaction?.transactionId });
      } catch (err) {
        next(err);
      }
    }

  async updateCashback(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, trId } = req.params;
      const { cashback } = req.body;
      
      const account = await getValidatedAccount(Number(id));
  
      const transacation = await getValidatedTransaction(
        this.service as TransactionService, 
        account.cpf_cnpj as string, 
        Number(trId));
  
      await this.service.update(Number(transacation.transactionId), {
        cashback,
        transactionId: transacation.transactionId,
        account_id: account.cpf_cnpj,
      });
  
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, trId } = req.params;

      const account = await getValidatedAccount(Number(id));
  
      const transaction = await getValidatedTransaction(
        this.service as TransactionService,
        account.cpf_cnpj as string,
        Number(trId)
      );
  
      return res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const account = await getValidatedAccount(Number(id));
  
      const transactions = await (this.service as TransactionService).find(account.cpf_cnpj);
      if (!transactions) {        
        return res.status(404).json({ message: 'Transação não encontrada' });
      }
  
      const response = transactions.map(t => ({
        transactionId: t.transactionId,
        accountId: t.account_id,
        date: t.transaction_date,
        value: t.amount,
        cashback: t.cashback,
      }));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, trId } = req.params;
      const updateData = req.body;
  
     const account = await getValidatedAccount(Number(id));
  
     const transaction = await getValidatedTransaction(
      this.service as TransactionService,
      account.cpf_cnpj as string,
      Number(trId)
    );
  
      await this.service.update(Number(trId), {
        ...transaction,         
        ...updateData,         
        transactionId: Number(trId),
        account_id: account.cpf_cnpj,
      });
  
      return res.status(204).end(); 
    } catch (error) {
      next(error);
    }
  }
  
}