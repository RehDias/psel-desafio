/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Context from "./Context";
import type { ProviderValues } from "../types/Types";
import { createAccount, getAccount, loginApi } from "../api/accountApi";
import type { CreateAccount } from "../types/AccountTypes";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../api/transactionApi";

function Provider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  
  function logout() {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenTimestamp');
    navigate('/login');
  }

  useEffect(() => {
    async function validateAndFetchUser() {
      const storedToken = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');

      if (!storedToken || !userId || !tokenTimestamp) {
        setLoading(false);
        return;
      }

      const now = Date.now();
      const tokenAge = now - Number(tokenTimestamp);
      const twoHours = 2 * 60 * 60 * 1000;

      if (tokenAge > twoHours) {
        logout();
        setLoading(false);
        return;
      }

      try {
        const userData = await getAccount(storedToken, Number(userId));
        const responseTransaction = await getTransactions(storedToken, Number(userId));      
        
        setTransactions(responseTransaction);
        setUser(userData);
        setToken(storedToken);
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        setError('Erro ao buscar usuário');
        logout();
      } finally {
        setLoading(false);
      }
    }

    validateAndFetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenTimestamp', Date.now().toString());
    }
  }, [token]);


  async function onLogin(cpf_cnpj: string, password: string) {
    try {
      const response = await loginApi(cpf_cnpj, password);

      if (response.user.account_status === false) {
        alert('Sua conta está desativada. Por favor, crie uma nova conta para acessar o sistema.');
        return false;
      }
      
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('tokenTimestamp', Date.now().toString());
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

  async function refreshTransactions(token: string, userId: number) {
  const updatedList = await getTransactions(token, userId);
  setTransactions(updatedList);
}

  const values: ProviderValues = {
    user,
    onLogin,
    token,
    error,
    onRegister,
    logout,
    loading,
    setLoading,
    setError,
    setUser,
    transactions,
    setTransactions,
    refreshTransactions
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );

}

export default Provider;