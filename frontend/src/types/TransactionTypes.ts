export type Transaction = {
  transactionId: number,
  account_id: string,
  cashback: number,
  amount: number,
  transaction_date: Date
}

export type TransactionCreation = {
  cashback: number,
  amount: number,
  transaction_date: string | Date
}