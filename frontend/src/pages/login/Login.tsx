import { useContext, useState } from "react";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const { onLogin, error } = useContext(Context);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    cpf_cnpj: '',
    password: ''
  });  
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const success = await onLogin(input.cpf_cnpj, input.password);

      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Erro no login:', err);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }
    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          onChange={handleChange}
          id='cpf_cnpj'
          name='cpf_cnpj'
          required 
          placeholder="Informe seu CPF ou CNPJ" 
        />
        <input 
          type="password" 
          onChange={handleChange}
          id='password'
          name='password'
          required
          placeholder="Informe sua senha" 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
        <button
          type="button" 
          onClick={() => navigate('/register')}
         >
          Register
        </button>
      </form>
      <p>Forgot Password</p>
    </>
  )
}

export default Login;