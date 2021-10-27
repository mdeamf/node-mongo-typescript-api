import express, { Request, Response } from 'express';
import { IProduto } from '../interfaces/produtos.interfaces';
import Produtos from '../models/produtos.models';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const produtos = await Produtos.find();
  return res.status(200).json(produtos);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const produtos = await Produtos.findByIdAndRemove(req.params.id);
  return res.status(200).json(produtos);
});

router.post('/', async (req: Request, res: Response) => {
  const produtoNovo: IProduto = {
    descricao: req.body.descricao,
    valor_unit: req.body.valor_unit,
  };

  const produto = await Produtos.create(produtoNovo);
  await produto.save();

  return res.status(201).json(produto);
});

export default router;
