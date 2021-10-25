import express from 'express';
import pedidosRouter from './pedidos.routes';
import produtosRouter from './produtos.routes';

const router = express.Router();

router.use('/pedidos', pedidosRouter);
router.use('/produtos', produtosRouter);

export default router;
