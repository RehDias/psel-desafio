import 'dotenv/config';
import app from "./app";

const PORT = process.env.SERVER_PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});

export default server;