import mongoose from 'mongoose';

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

const Pedidos = mongoose.model('Pedidos', pedidosSchema);

export default Pedidos;
