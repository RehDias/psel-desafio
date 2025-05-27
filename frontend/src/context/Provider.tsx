/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Context from "./Context";
import type { ProviderValues } from "../types/Types";
import { createAccount, loginApi } from "../api/accountApi";
import type { CreateAccount } from "../types/AccountTypes";

function Provider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  async function onLogin(cpf_cnpj: string, password: string) {
    try {
      const response = await loginApi(cpf_cnpj, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      setError('');
      return true;

    } catch (error: any) {
      const message = error.message || 'Erro ao realizar login';
      setError(message);
      return false;
    }
  }

  async function onRegister(obj: CreateAccount) {
    try {
      const cpfCnpjRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{11}|\d{14})$/;
      if (!cpfCnpjRegex.test(obj.cpf_cnpj)) {
        setError('CPF ou CNPJ inválido');
        return false;
      }

      await createAccount(obj);
      await onLogin(obj.cpf_cnpj, obj.password);
      setError('');
      return true;

    } catch (error: any) {
      const message = error.message || 'Erro ao realizar cadastro';
      setError(message);
      return false;
    }
  }

  const values: ProviderValues = {
    user,
    onLogin,
    token,
    error,
    onRegister
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );

}

export default Provider;