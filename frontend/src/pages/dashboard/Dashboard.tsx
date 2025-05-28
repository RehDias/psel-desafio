import { useContext } from "react";
import Context from "../../context/Context";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
    const { user } = useContext(Context);

  return (
    <>
      <h1>Olá { user?.name }</h1>
      <Sidebar />
    </>
  )
}

export default Dashboard;