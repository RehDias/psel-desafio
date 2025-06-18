import axios from "axios";
import type { CreateAccount, UpdateAccount } from "../types/AccountTypes";
import { handleApiError } from "../utils/HandleApiError";

const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function loginApi(cpf_cnpj: string, password: string) {
 try {
   const response = await axios.post(`${URL}/login`, {
     cpf_cnpj,
     password,
   });

   return response.data;

 } catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}

export async function createAccount(account: CreateAccount) {
  try {
    const response = await axios.post(`${URL}/account`, {
      ...account,
    });
    const data = await response.data;
    return data;

  } catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}

export async function getAccount(token: string, id: number) {
  try {
    const response = await axios.get(`${URL}/account/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await response.data;
    return data;

  }  catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}

export async function updateAccount(
  token: string,
  id: number,
  account: UpdateAccount
) {
  try {
    const response = await axios.put(`${URL}/account/${id}`, {
      ...account,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await response.data;
    
    return data;

  } catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}

export async function deleteAccount(token: string, id: number | undefined) {
  try {
    const response = await axios.delete(`${URL}/account/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await response.data;
    return data;

  } catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}