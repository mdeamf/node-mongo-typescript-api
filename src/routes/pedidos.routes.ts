import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { IPedidoModel, IPedidoBody } from '../interfaces/pedidos.interfaces';
import Itens from '../models/itens.models';
import Pedidos from '../models/pedidos.models';
import Produtos from '../models/produtos.models';

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pedidoBody: IPedidoBody = req.body;

    const pedidoInserir: IPedidoModel = {
      descricao: pedidoBody.descricao,
      data: pedidoBody.data,
      valor_total: pedidoBody.valor_total,
      itens: [],
    };

    for (let item of pedidoBody.itens) {
      const produtoExiste = await Produtos.findById(item.produto);
      console.log('>>>>>>', item.produto, produtoExiste);
      if (!produtoExiste) throw new Error(`Produto ${item.produto} não encontrado!`);
    }

    const itens = await Itens.create(pedidoBody.itens, { session: session });
    console.log(itens);

    pedidoInserir.itens = itens.map((item) => item._id);

    const pedido = await Pedidos.create([pedidoInserir], { session: session });
    console.log(pedido);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(pedido);
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: err.toString(),
    });
  }
});

export default router;
