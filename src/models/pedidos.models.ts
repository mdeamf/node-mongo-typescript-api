import mongoose from 'mongoose';
import { IPedidoModel } from '../interfaces/pedidos.interfaces';

const pedidosSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  valor_total: {
    type: Number,
    required: true,
  },
  itens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itens',
    },
  ],
});

pedidosSchema.pre('save', function (next) {
  console.log('Estamos salvando o seu pedido...');
  next();
})

const Pedidos = mongoose.model<IPedidoModel>('Pedidos', pedidosSchema);

export default Pedidos;
