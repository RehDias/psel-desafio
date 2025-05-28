import { useContext } from "react";
import Context from "../../context/Context";

function Dashboard() {
    const { user } = useContext(Context);

  return (
    <>
      <h1>Olá { user?.name }</h1>
      <aside >
        <nav>
          <h2>Menu</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href={`/account/${user?.id}`} style={{ textDecoration: "none", color: "#ffff" }}>Perfil do Cadastro</a>
            </li>
            <li>
              <details>
                <summary style={{ cursor: "pointer" }}>Transações</summary>
                <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
                  <li>
                    <a href={`/transaction/new/${user?.id}`} style={{ textDecoration: "none", color: "#ffff" }}>Nova Transação</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}/:trId`} style={{ textDecoration: "none", color: "#ffff" }}>Detalhes</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}/cashback/:trId`} style={{ textDecoration: "none", color: "#ffff" }}>Cashback</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}`}style={{ textDecoration: "none", color: "#ffff" }}>Extrato</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Dashboard;