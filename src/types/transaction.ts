// types/transaction.ts
export interface Transaction {
  id: string;
  description: string;
  type: string;
  amount_ngn: number;
  source: string;
}

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}
