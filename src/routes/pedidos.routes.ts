import express, { Request, Response } from 'express';
import { IPedidoModel, IPedidoBody } from '../interfaces/pedidos.interfaces';
import Itens from '../models/itens.models';
import Pedidos from '../models/pedidos.models';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  // const pedido = await Pedidos.findOne({ _id: req.params.id });
  const pedido = await Pedidos.findById(req.params.id);
  return res.status(200).json(pedido);
});

router.put('/:id', async (req: Request, res: Response) => {
  const pedido = await Pedidos.findByIdAndUpdate(req.params.id, {
    data: req.body.data,
  });
  return res.status(200).json(pedido);
});

router.get('/', async (req: Request, res: Response) => {
  // const pedidos = await Pedidos.find();
  // const pedidos = await Pedidos.find().populate('itens');
  /* const pedidos = await Pedidos.find().populate({
    path: 'itens',
    populate: {
      path: 'produto',
    },
  }); */
  /* const pedidos = await Pedidos.find().select({
    descricao: 1,
    itens: 1,
  }); */

  const pedidos = await Pedidos.find()
    .select({
      descricao: 1,
      itens: 1,
    })
    .populate({
      path: 'itens',
      select: { produto: 1, quantidade: 1, _id: 0 },
      populate: {
        path: 'produto',
        select: { descricao: 1, _id: 0 },
      },
    });
  return res.status(200).json(pedidos);
});

router.post('/', async (req: Request, res: Response) => {
  const pedidoBody: IPedidoBody = req.body;

  const pedidoInserir: IPedidoModel = {
    descricao: pedidoBody.descricao,
    data: pedidoBody.data,
    valor_total: pedidoBody.valor_total,
    itens: [],
  };

  for (let item of pedidoBody.itens) {
    const itemAdicionado = await Itens.create(item);
    await itemAdicionado.save();
    pedidoInserir.itens.push(itemAdicionado._id);
  }

  const pedido = await Pedidos.create(pedidoInserir);
  await pedido.save();

  return res.status(201).json(pedido);
});

export default router;
