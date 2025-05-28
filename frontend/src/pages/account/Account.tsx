/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user, setLoading, updateUser, setError } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState({
    name: user?.name || '',
    cpf_cnpj: user?.cpf_cnpj || '',
    email: user?.email || '',
    password: user?.password || ''
  });

  const navigate = useNavigate();

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
      <div className="profile-container">
        <div className="profile-header">
          <h1>Perfil</h1>
          {!isEditing ? (
            <div className="profile-actions">
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Editar
              </button>
              <button className="delete-button">
                Excluir
              </button>
            </div>
          ) : null}
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={input.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled-input' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cpf_cnpj">CPF/CNPJ:</label>
            <input 
              type="text" 
              name="cpf_cnpj" 
              id="cpf_cnpj"
              value={input.cpf_cnpj}
              disabled
              className="disabled-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={input.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled-input' : ''}
            />
          </div>
          
          {isEditing && (
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Nova senha" 
                value={input.password}
                onChange={handleChange}
                className="password-input"
              />
              <small className="password-hint">
                Deixe em branco se não quiser alterar
              </small>
            </div>
          )}
          
          {isEditing && (
            <div className="form-actions">
              <button type="submit" className="save-button">
                Salvar
              </button>
              <button 
                type="button"
                className="cancel-button"
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