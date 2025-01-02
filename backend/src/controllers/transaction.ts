import { Transaction } from "../interfaces/Transaction";
import Service from "../services/service";
import TransactionService from "../services/transaction";
import Controller from "./controller";

export default class TransactionController extends Controller<Transaction> {
  constructor(service: Service<Transaction> = new TransactionService) {
    super(service);
  } 
}