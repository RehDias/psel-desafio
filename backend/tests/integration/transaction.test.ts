import App from "../../src/app";
import { initDbTest, sequelizeTest } from "../../src/database/sequelize.test";
import request from "supertest";

const app = new App().app;
describe('Transaction integration tests', () => {
  let token: string;
  const accountTest = {
      cpf_cnpj: '123.456.789-01',
      name: 'Maria',
      email: 'teste@email.com',
      password: 'senha123',
      account_status: true,
    };
  const transactionTest =  {
    cashback: 0.10,
    amount: 100.00
  }

  beforeEach(async () => {
    jest.clearAllMocks();
    await initDbTest();

    await request(app).post('/account').send(accountTest);

    const login = await request(app).post('/login').send({
      cpf_cnpj: accountTest.cpf_cnpj,
      password: accountTest.password,
    });
    
    token = login.body.token;
  });

  afterAll(async () => {
    await sequelizeTest.close();
  });

  it('should create a transaction with success', async () => {
    const response = await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('transactionId');
    expect(typeof response.body.transactionId).toBe('number');
  });

  it('should find all transactions with success', async () => {
    await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    const response = await request(app)
      .get('/transaction/1')
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should find a transaction with success', async () => {
    const transaction = await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    const response = await request(app)
      .get(`/transaction/1/${transaction.body.transactionId}`)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('transactionId');
    expect(response.body.transactionId).toBe(transaction.body.transactionId);
  });

  it('should update a transaction with success', async () => {
    const transaction = await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    const response = await request(app)
      .put(`/transaction/1/${transaction.body.transactionId}`)
      .set('Authorization', `${token}`)
      .send({ cashback: 0.20 });

    expect(response.status).toBe(204);
  });

  it('should delete a transaction with success', async () => {
    const transaction = await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    const response = await request(app)
      .delete(`/transaction/1/${transaction.body.transactionId}`)
      .set('Authorization', `${token}`);

    expect(response.status).toBe(204);
  });

  it('should update cashback of a transaction with success', async () => {
    const transaction = await request(app)
      .post('/transaction/1')
      .set('Authorization', `${token}`)
      .send(transactionTest);

    const response = await request(app)
      .patch(`/transaction/1/cashback/${transaction.body.transactionId}`)
      .set('Authorization', `${token}`)
      .send({ cashback: 0.20 });

    expect(response.status).toBe(204);
  });

  it('should return 404 when transaction not found', async () => {
    const response = await request(app)
      .get('/transaction/1/999')
      .set('Authorization', `${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Transação não encontrada ou não pertence à conta!');
  });
});