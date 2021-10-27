import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './src/routes';

dotenv.config();
const app = express();
const port = process.env.PORT;
const mdb = process.env.MONGODB_CNCTSTR || '';

app.use(express.json(), cors(), router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'API está funcionando.',
  });
});

mongoose.connect(mdb, (err) => {
  if (err) {
    console.log('MongoDB | Conexão falhou...', err);
  } else {
    console.log('MongoDB | Conectado com sucesso!');
  }
});

app.listen(port, () => {
  console.log(`API inicializada com sucesso | Porta ${port}`);
});
