import { ITransaction } from "@/types/transaction";
import { api } from "../api";

export async function getTransactions() {
  try {
    const response = await api.get<ITransaction[]>("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post<ITransaction>('/transactions', transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}