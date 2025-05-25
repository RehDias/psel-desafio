import axios from "axios";
import type { CreateAccount, UpdateAccount } from "../types/AccountTypes";
import { handleApiError } from "../utils/HandleApiError";

const URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function login(email: string, password: string) {
 try {
   const response = await axios.post(`${URL}/login`, {
     email,
     password,
   });

   return response.data;
 } catch (error) {
  const { message } = handleApiError(error);
  throw new Error(message);
 }
}

export async function createAccount(account: CreateAccount) {
  const response = await axios.post(`${URL}/account`, {
    ...account,
  });
  const data = await response.data;
  return data;
}

export async function getAccount(token: string, id: number) {
  const response = await axios.get(`${URL}/account/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  return data;
}

export async function updateAccount(
  token: string,
  id: number,
  account: UpdateAccount
) {
  const response = await axios.put(`${URL}/account/${id}`, {
    ...account,
  }, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  return data;
}

export async function deleteAccount(token: string, id: number) {
  const response = await axios.delete(`${URL}/account/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  return data;
}