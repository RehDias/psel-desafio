import { Navigate, useNavigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import Context from "../context/Context";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading, error } = useContext(Context);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleRetry = () => {
    window.location.reload(); 
  };

  if (loading) {
    return (
      <div>
        <div></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <div>
        <div>
          <h2>Ocorreu um erro</h2>
          <p>{error}</p>
          <div>
            <button onClick={handleGoBack}>
              Voltar
            </button>
            <button onClick={handleRetry}>
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;