import express from 'express';
import cors from 'cors';
import { accountRouter, transactionRouter } from './routers';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import loginRouter from './routers/login.routes';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json());

    this.routes();
    
    this.app.use(ErrorMiddleware.handleErr as any);
  }

  private routes(): void {
    this.app.use('/login', loginRouter);
    this.app.use('/account', accountRouter);
    this.app.use('/transaction',transactionRouter);
  }
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`));
  }
}