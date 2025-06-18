/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { deleteAccount, updateAccount } from "../../api/accountApi";
import type { UpdateAccount } from "../../types/AccountTypes";

function Account() {
  const { user, setLoading, setError, setUser, token, logout } = useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState({
    name: user?.name || '',
    cpf_cnpj: user?.cpf_cnpj || '',
    email: user?.email || '',
    password: user?.password || ''
  });

  const navigate = useNavigate();

  async function updateUser(id: number, obj: UpdateAccount) {
    if (!obj || !token) {
      setError('Usuário não autenticado');
      return false;
    }
    try {
      const updatedUser = await updateAccount(token, id, obj);
      setUser(updatedUser);

      setError('');
      return true;

    } catch (error: any) {
      const message = error.message || 'Erro ao atualizar usuário';
      setError(message);
      return false;
    }
  }

    async function handleDelete() {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja deletar a conta? Esta ação não pode ser desfeita.");
      if (!confirmDelete) {
        return false;
      }
      
      await deleteAccount(token, user?.id);
      
      logout();
     
      return true;

    } catch (err: any) {
      console.log('ocorreu um erro ao deletar a conta!', err);

      const message = err.message || 'Erro ao atualizar usuário';
      setError(message);

      return false;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    try {
      if (user?.id !== undefined) {
        const { cpf_cnpj, password, ...updateData } = input;
        const dataToUpdate = password 
          ? { ...updateData, password } 
          : updateData;

        const success = await updateUser(user.id, dataToUpdate);
        setIsEditing(false);

         if (success) {
          setIsEditing(false);
          await new Promise(resolve => setTimeout(resolve, 100));
          navigate('/dashboard'); 
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);      
      setError('Erro ao atualizar perfil. Por favor, tente novamente.');
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
      <div>
      <div>
        <h1>Perfil</h1>
        {!isEditing ? (
        <div>
          <button 
          onClick={() => setIsEditing(true)}
          >
          Editar
          </button>
          <button
            onClick={handleDelete}>
          Excluir
          </button>
        </div>
        ) : null}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name">Nome:</label>
        <input 
          type="text" 
          name="name" 
          id="name"
          value={input.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        </div>
        
        <div>
        <label htmlFor="cpf_cnpj">CPF/CNPJ:</label>
        <input 
          type="text" 
          name="cpf_cnpj" 
          id="cpf_cnpj"
          value={input.cpf_cnpj}
          disabled
        />
        </div>
        
        <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          value={input.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
        </div>
        
        {isEditing && (
        <div>
          <label htmlFor="password">Senha:</label>
          <input 
          type="password" 
          name="password" 
          id="password"
          placeholder="Nova senha" 
          value={input.password}
          onChange={handleChange}
          />
          <small>
          Deixe em branco se não quiser alterar
          </small>
        </div>
        )}
        
        {isEditing && (
        <div>
          <button type="submit">
          Salvar
          </button>
          <button 
          type="button"
          onClick={() => setIsEditing(false)}
          >
          Cancelar
          </button>
        </div>
        )}
      </form>
      </div>
    </>
  );
}

export default Account;