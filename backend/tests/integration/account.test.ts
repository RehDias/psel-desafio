import request from "supertest";
import App from "../../src/app";
import { initDbTest, sequelizeTest } from "../../src/database/sequelize.test";

const app = new App().app;

describe("Account integration tests", () => {
  let token: string;
  const accountTest = {
        cpf_cnpj: '123.456.789-01',
        name: 'Maria',
        email: 'teste@email.com',
        password: 'senha123',
        account_status: true,
      };

  beforeEach(async () => {
    jest.clearAllMocks();
    await initDbTest();

    await request(app).post('/account').send(accountTest);

    const login = await request(app).post('/login').send({
      email: 'teste@email.com',
      password: 'senha123',
    });
    
    token = login.body.token;
  });

  afterAll(async () => {
    await sequelizeTest.close();
  });

  it('should create an account with sucess', async () => {
    const response = await request(app)
      .post('/account')
      .send({
        cpf_cnpj: '985.457.842-22',
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: 'senha123',
        account_status: true,
      });

    expect(response.status).toBe(201);
  });

  it('should not create an account with invalid CPF', async () => {
    const response = await request(app)
      .post('/account')
      .send({
        cpf_cnpj: '123877',
        name: 'Maria',
        email: 'teste@email.com',
        password: 'senha123',
        account_status: true,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'O documento deve ser um CPF ou CNPJ válido.' });
  });

  it('should get an account by id with success', async () => {
    const response = await request(app)
      .get(`/account/1`)
      .send();
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        id: 1,
        cpf_cnpj: '123.456.789-01',
        name: 'Maria',
        email: 'teste@email.com',
        password: 'senha123',
        account_status: true,
    });
  });

  it('should not get an account by id that does not exist', async () => {
    const response = await request(app).get(`/account/99999`).send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Conta não encontrada!' });
  });

  it('should update an account with success', async () => {    
    const response = await request(app)
      .put(`/account/1`)
      .set('Authorization', `${token}`)
      .send({
        name: 'Usuário Atualizado',
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Conta atualizada com sucesso!!'});
  });

  it('should return all accounts with success', async () => {
    const response = await request(app)
      .get('/account')
      .send();
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ ...accountTest, id: 1 }]);
  });

  it('should delete an account with success', async () => {
    const response = await request(app)
      .delete(`/account/1`)
      .set('Authorization', `${token}`)
      .send();    
    
    expect(response.status).toBe(204);
  });
});