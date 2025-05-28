import { useContext, useState } from "react";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Register() {
  const { onRegister, setError, error } = useContext(Context);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    cpf_cnpj: '',
    email: '',
    password: ''
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const success = await onRegister(input);

      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError('Erro ao realizar o cadastro, tente novamente!')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  return (
    <>
      <h1>Cadastro</h1>
      <p>Já possui uma conta? </p>
      <p onClick={() => navigate('/login')}>Faça Login</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          onChange={handleChange}
          id='name'
          name='name'
          required
          placeholder="Informe seu nome" 
        />
        <input 
          type="text"
          onChange={handleChange}
          id='cpf_cnpj'
          name='cpf_cnpj'
          required
          placeholder="Informe seu CPF ou CNPJ"
        />
        <input 
          type="email"
          onChange={handleChange}
          id='email'
          name='email'
          required 
          placeholder="Informe seu e-mail" 
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
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register;