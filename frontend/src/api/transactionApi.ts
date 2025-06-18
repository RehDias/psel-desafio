import axios from "axios";
import { handleApiError } from "../utils/HandleApiError";
import type { TransactionCreation } from "../types/TransactionTypes";

const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getTransactions(token: string, id: number) {
  try {
    const response = await axios.get(`${URL}/transaction/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await response.data;
    return data;

  } catch (err) {
    console.log('erro ao buscar transações', err);
    handleApiError(err);
  }
}

export async function createTransaction(token: string, id: number, obj: TransactionCreation) {
  try {
    const response = await axios.post(`${URL}/transaction/${id}`, {
      ... obj
    }, { headers: { Authorization: `${token}` },});
    
    const data = await response.data;
    
    return data; 
  } catch (err) {
    console.log('erro ao criar transação', err);
    handleApiError(err);    
  }
}

export async function findTransactionById(token: string, userId: number, trId: number) {
  try {
    const response = await axios.get(`${URL}/transaction/${userId}/${trId}`, {
      headers: { Authorization: `${token}` }
    });

    const data = await response.data;

    return data;
  } catch (err) {
    console.log('erro ao encontrar transação', err);
    handleApiError(err);    
  }
}

export async function updateTransaction(token: string, userId: number, trId: number, obj: TransactionCreation) {
  try {
    const response = await axios.put(`${URL}/transaction/${userId}/${trId}`, {
      ...obj
    }, { headers: { Authorization: `${token}` }});

    const data = await response.data;

    return data;

  } catch (err) {
    console.log('erro ao atualizar transação', err);
    handleApiError(err); 
  }
}

export async function deleteTransaction(token: string, userId: number, trId: number) {
  try {
    const response = await axios.delete(`${URL}/transaction/${userId}/${trId}`, {
      headers: { Authorization: `${token}` }
    });

    const data = await response.data;

    return data;
  } catch (err) {
    console.log('erro ao deletar transação', err);
    handleApiError(err);    
  }
}