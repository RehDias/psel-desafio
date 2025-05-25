/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Context from "./Context";
import type { ProviderValues } from "../types/Types";
import { login } from "../api/accountApi";

function Provider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  async function onLogin(email: string, password: string) {
    try {
      const response = await login(email, password);
      setUser(response.user);
      setToken(response.token);
      setError('');
      return true;

    } catch (error: any) {
      const message = error.message || 'Erro ao realizar login';
      setError(message);
      return false;
    }
  }

  const values: ProviderValues = {
    user,
    onLogin,
    token,
    error
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );

}

export default Provider;