import { useContext } from "react";
import Context from "../context/Context";

function Sidebar() {
  const { user, logout } = useContext(Context);
  
  return (
    <aside >
      <nav>
        <details>
          <summary style={{ cursor: "pointer" }}>Menu</summary>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href={`/account/${user?.id}`}>Perfil do Cadastro</a>
            </li>
            <li>
              <a href={`/dashboard`}>Dashboard</a>
            </li>
            <li>
              <details>
                <summary style={{ cursor: "pointer" }}>Transações</summary>
                <ul>
                  <li>
                    <a href={`/transaction/new/${user?.id}`}>Nova Transação</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}/:trId`}>Detalhes</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}/cashback/:trId`}>Cashback</a>
                  </li>
                  <li>
                    <a href={`/transaction/${user?.id}`}>Extrato</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <p onClick={logout}>Logout</p>
            </li>
          </ul>
        </details>
      </nav>
    </aside>
  )
}

export default Sidebar;