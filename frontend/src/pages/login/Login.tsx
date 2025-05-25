import { useContext, useState } from "react";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";
import type { ContextType } from "../../types/Types";

function Login() {
  const { onLogin, error } = useContext(Context) as ContextType;
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });  
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const success = await onLogin(input.email, input.password);

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
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          onChange={handleChange}
          id='email'
          name='email'
          required 
          placeholder="Enter your e-mail" 
        />
        <input 
          type="password" 
          onChange={handleChange}
          id='password'
          name='password'
          required
          placeholder="Enter yout password" 
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