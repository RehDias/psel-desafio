import TransactionModel from "../../src/models/TransactionModel";
import TransactionService from "../../src/services/transaction";

jest.mock('../../src/models/TransactionModel');

describe('transaction service unit tests', () => {
  let service: TransactionService;
  let mockModel: jest.Mocked<TransactionModel>;
  const transaction = {
    transactionId: 1,
    account_id: '123.456.789-00',
    cashback: 0.5,
    amount: 100.00,
    transaction_date: new Date(),
  }

  beforeEach(() => {
    jest.clearAllMocks(); 
    jest.resetAllMocks();
  
    mockModel = new TransactionModel() as jest.Mocked<TransactionModel>;
    service = new TransactionService(mockModel);  
  });

  it('should create a new transaction', async () => {
    mockModel.create.mockResolvedValue(transaction);

    const result = await service.create(transaction);

    expect(mockModel.create).toHaveBeenCalledWith(transaction);
    expect(result).toEqual(transaction);
  });

  it('should find all transactions', async () => {
    const transaction2 = {
      transactionId: 2,
      account_id: '123.456.789-01',
      cashback: 0.3,
      amount: 50.00,
      transaction_date: new Date(),
    }

    mockModel.find.mockResolvedValue([transaction, transaction2]);

    const result = await service.find();

    expect(mockModel.find).toHaveBeenCalled();
    expect(result).toEqual([transaction, transaction2]);
  });

  it('should find a transaction by id', async () => { 
    mockModel.findById.mockResolvedValue(transaction);

    const result = await service.findById(1);

    expect(mockModel.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(transaction);
  });

  it('should update a transaction', async () => {
    const updatedTransaction = { ...transaction, cashback: 0.8 };

    mockModel.update.mockResolvedValue(undefined);

    await service.update(1, updatedTransaction);

    expect(mockModel.update).toHaveBeenCalledWith(1, updatedTransaction);
  });

  it('should delete a transaction', async () => {
    mockModel.delete.mockResolvedValue(undefined);

    await service.delete(1);

    expect(mockModel.delete).toHaveBeenCalledWith(1);
  });

  it('should find transactions by account_id', async () => {
    const transaction2 = {
      transactionId: 2,
      account_id: '123.456.789-00',
      cashback: 0.3,
      amount: 50.00,
      transaction_date: new Date(),
    }

    mockModel.find.mockResolvedValue([transaction, transaction2]);

    const result = await service.find('123.456.789-00');

    expect(mockModel.find).toHaveBeenCalledWith('123.456.789-00');
    expect(result).toEqual([transaction, transaction2]);
  });

});