import express, { Request, Response } from 'express';
import Itens from '../models/itens.models';
import Pedidos from '../models/pedidos.models';

const router = express.Router();

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
  const { descricao, data, valor_total, itens } = req.body;

  const itensAdicionados = [];
  for (let item of itens) {
    const itemAdicionado = await Itens.create({
      produto: item.produto,
      quantidade: item.quantidade,
    });
    itensAdicionados.push(itemAdicionado._id);
  }

  const pedido = await Pedidos.create({
    descricao,
    data,
    valor_total,
    itens: itensAdicionados,
  });
  await pedido.save();

  return res.status(201).json(pedido);
});

export default router;
