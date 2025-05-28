import AccountModel from "../../src/models/AccountModel";
import AccountService from "../../src/services/account";

jest.mock('../../src/models/AccountModel');

describe('account service unit tests', () => {
  let service: AccountService;
  let mockModel: jest.Mocked<AccountModel>;
  const account = { 
      id: 1, 
      cpf_cnpj: '12345678901', 
      name: 'John Doe', 
      email: 'teste@email.com', 
      password: '123456', 
      account_status: true 
    };
  const accountWithoutPassword = { 
      id: 1, 
      cpf_cnpj: '12345678901', 
      name: 'John Doe', 
      email: 'teste@email.com', 
      account_status: true 
    }

  beforeEach(() => {
    jest.clearAllMocks(); 
    jest.resetAllMocks();

    mockModel = new AccountModel() as jest.Mocked<AccountModel>;
    service = new AccountService(mockModel);
    
  });
  it('should create a new account', async () => {
    mockModel.create.mockResolvedValue(accountWithoutPassword);

    const result = await service.create(account);

    expect(mockModel.create).toHaveBeenCalledWith(account);
    expect(result).toEqual(accountWithoutPassword);
  });

  it('should find all accounts', async () => {
     const account2 = { 
      id: 2, 
      cpf_cnpj: '123.456.789-01', 
      name: 'Jane Doe', 
      email: 'teste1@email.com', 
      account_status: true 
    };

    mockModel.find.mockResolvedValue([accountWithoutPassword, account2]);

    const result = await service.find();

    expect(mockModel.find).toHaveBeenCalled();
    expect(result).toEqual([accountWithoutPassword, account2]);
  });

  it('should find an account by id', async () => { 
    mockModel.findById.mockResolvedValue(accountWithoutPassword);

    const result = await service.findById(1);

    expect(mockModel.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(accountWithoutPassword);
  });
  
  it('should find an account by cpf_cnpj', async () => {
    mockModel.findOne.mockResolvedValue(accountWithoutPassword);

    const result = await service.findOne('12345678901');

    expect(mockModel.findOne).toHaveBeenCalledWith('12345678901');
    expect(result).toEqual(accountWithoutPassword);
  });

  it('should update an account', async () => {
    const updatedAccount = {     
      id: 1, 
      name: 'Jane Doe', 
      email: 'teste@email.com', 
      account_status: true  
    };
    mockModel.update = jest.fn().mockResolvedValue(updatedAccount);

    await service.update(1, { name: 'Jane Doe'});

    expect(mockModel.update).toHaveBeenCalledWith(1, { name: 'Jane Doe' });
    expect(mockModel.update).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when update is not defined', async () => {
    const mockModelWithoutUpdate = {
      ...mockModel,
      update: undefined,
    } as unknown as jest.Mocked<AccountModel>;

    service = new AccountService(mockModelWithoutUpdate);

    await expect(service.update(1, {
      name: 'Jane Doe',
      id: 0,
      cpf_cnpj: "",
      email: "",
      password: "",
      account_status: false
    })).rejects.toThrow('Não é possível realizar atualizações!!');
  });

  it('should throw an error when trying to update cpf_cnpj', async () => {
    await expect(service.update(1, { cpf_cnpj: '12345678901' }))
    .rejects.toThrow('Não é permitido alterar CPF ou CNPJ!!');
  });

  it('should delete an account', async () => {
    mockModel.delete = jest.fn().mockResolvedValue(undefined);

    await service.delete(1);

    expect(mockModel.delete).toHaveBeenCalledWith(1);
  });
});