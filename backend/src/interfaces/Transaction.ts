export interface Transaction {
  transactionId: number,
  account_id: string,
  cashback: number,
  amount: number,
  transaction_date: Date
}