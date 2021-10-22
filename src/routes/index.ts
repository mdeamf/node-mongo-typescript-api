import express from 'express';
import pedidosRouter from './pedidos.routes';

const router = express.Router();

router.use('/pedidos', pedidosRouter);

export default router;
