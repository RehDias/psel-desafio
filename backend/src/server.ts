import 'dotenv/config';
import App from './app';

const PORT = process.env.SERVER_PORT || 3000;

const app = new App();

const server = app.start(PORT);

export default server;