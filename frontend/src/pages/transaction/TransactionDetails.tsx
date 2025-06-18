/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import { findTransactionById, updateTransaction } from "../../api/transactionApi";
import type { Transaction } from "../../types/TransactionTypes";

function TransactionDetails() {
  const { id, trId } = useParams();
  const { setError, setLoading, token, refreshTransactions } = useContext(Context);
  const [ transaction, setTransaction ] = useState<Transaction | null>(null);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ input, setInput ] = useState({
    cashback: transaction?.cashback || 0,
    amount: transaction?.amount || 0,
    transaction_date: transaction?.transaction_date || new Date().toISOString().split('T')[0], // yyyy-mm-dd
  });

  const navigate = useNavigate();

 useEffect(() => {
    async function fetchTransactionDetails() {
      if (!token || !id || !trId) {
        console.error("Token, ID ou Transaction ID não fornecidos.");
        setError("Token, ID ou Transaction ID não fornecidos.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await findTransactionById(token, Number(id), Number(trId));
        setTransaction(response);
      } catch (error) {
        console.error("Erro ao buscar detalhes da transação:", error);
        setError("Erro ao buscar detalhes da transação.");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactionDetails();
  
  },[]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      if (!transaction || !token || !id || !trId) {
        setError("Dados insuficientes para atualizar a transação.");
        return;
      }

      const updated = await updateTransaction(token, Number(id), Number(trId), input);
      setInput(updated)

      await refreshTransactions(token, Number(id));

      navigate(`/transaction/${id}`)
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      setError("Erro ao atualizar transação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Sidebar />
      <h1>Detalhes da transação</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label>
        Valor:
        <input 
          type="number" 
          name="amount" 
          id="amount"
          disabled={!isEditing} 
          onChange={handleChange}
          value={input.amount}
          />
        </label>
      </div>
      <div>
        <label>
        Cashback:
        <input 
          type="number" 
          name="cashback" 
          id="cashback"
          disabled={!isEditing} 
          onChange={handleChange}
          value={input.cashback}
          />
        </label>
      </div>
      <div>
        <label>
        Data:
        <input 
          type="date" 
          name="transaction_date" 
          id="transaction_date"
          disabled={!isEditing} 
          onChange={handleChange}
          value={input.transaction_date.toString().split('T')[0]} // yyyy-mm-dd format
          />
        </label>
      </div>
      {isEditing ? (
        <button type="submit">
          Salvar
        </button>
      ) : (
        null
      )}
      </form>
      { !isEditing ? (
        <button
        type="button"
        onClick={() => setIsEditing(!isEditing)}
      >
        Editar
      </button>) : ( null )}
      <button
        type="button"
        onClick={() => navigate(`/transaction/${id}`)}
      >
        Voltar
      </button>
    </>
  )
}

export default TransactionDetails;
