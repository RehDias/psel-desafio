import { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import Context from "../../context/Context";
import type { Transaction } from "../../types/TransactionTypes";
import { useNavigate } from "react-router-dom";
import { deleteTransaction } from "../../api/transactionApi";

function TransactionList() {
  const { transactions, token, refreshTransactions, setLoading } = useContext(Context);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();  

  async function handleDelete(transactionId: number) {
    // Aqui você pode implementar a lógica para deletar a transação
    alert(`Deletar transação ${transactionId}`);
    setLoading(true);

    try {
      await deleteTransaction(token, Number(userId), transactionId);
      await refreshTransactions(token, Number(userId));
      return true;

    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <Sidebar />
      <h1>Extrato</h1>
      <table>
        <thead>
          <tr>
        <th>ID da Transação</th>
        <th>Valor</th>
        <th>Data</th>
        <th>Cashback</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((t: Transaction) => (
              <tr
          key={t.transactionId}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/transaction/${userId}/${t.transactionId}`)}
              >
          <td>{t.transactionId}</td>
          <td>{t.amount}</td>
          <td>
            {(() => {
              const dateObj = t.transaction_date instanceof Date ? t.transaction_date : new Date(t.transaction_date);
              return dateObj.toLocaleString("pt-BR");
            })()}
            </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(t.transactionId);
                }}
                style={{ color: "white", background: "red", border: "none", borderRadius: 4, padding: "4px 8px", cursor: "pointer" }}
              >
                Delete
              </button>
          </td>
          <td>{t.cashback}</td>
              </tr>
            ))
            ) : (
            <tr>
              <td colSpan={4}>Nenhuma transação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => navigate(`/transaction/new/${userId}`)}
        style={{ color: "white", background: "green", border: "none", borderRadius: 4, padding: "8px 16px", cursor: "pointer" }}
      >
        Adicionar Transação
      </button>
    </>
  )
}

export default TransactionList;