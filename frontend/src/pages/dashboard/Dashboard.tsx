import { useContext } from "react";
import Context from "../../context/Context";

function Dashboard() {
    const { user } = useContext(Context);

  return (
    <>
      <h1>Olá { user?.name }</h1>
    </>
  )
}

export default Dashboard;