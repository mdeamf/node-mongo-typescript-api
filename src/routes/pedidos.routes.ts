import express, { Request, Response } from 'express';
import Pedidos from '../models/pedidos.models';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const pedidos = await Pedidos.find();
  return res.status(200).json(pedidos);
});

router.post('/', async (req: Request, res: Response) => {
  const { descricao, data, valor_total } = req.body;
  const pedido = await Pedidos.create({
    descricao,
    data,
    valor_total,
  });
  await pedido.save();
  return res.status(201).json(pedido);
});

export default router;
