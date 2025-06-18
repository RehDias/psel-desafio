import { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Context from "../../context/Context";
import { createTransaction } from "../../api/transactionApi";
import { useNavigate } from "react-router-dom";

function NewTransaction() {
  const { setLoading, token, setError, refreshTransactions } = useContext(Context);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [input, setInput] = useState({
    cashback: 0,
    amount: 0,
    transaction_date: new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('userId');

    try {
      await createTransaction(token, Number(userId), input);

      await refreshTransactions(token, Number(userId));

    } catch (err) {
      console.error('Erro ao criar transação:', err);      
      setError('Erro ao criar transação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Sidebar />
      <h1>Adicionar uma nova transação</h1>
      <p>Preencha os campos abaixo e clique em "Adicionar" para criar uma nova transação.</p>
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Cashback:
          <input
            type="number"
            id="cashback"
            name="cashback"
            value={input.cashback}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            id="amount"
            name="amount"
            value={input.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            id="transaction_date"
            name="transaction_date"
            value={input.transaction_date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>
      <button 
        onClick={() => navigate(`/transaction/${userId}`)}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Ir para Extrato
      </button>
    </>
  )
}

export default NewTransaction;