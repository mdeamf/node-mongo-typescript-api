import mongoose from 'mongoose';
import { IProduto } from '../interfaces/produtos.interfaces';

const produtosSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
  valor_unit: {
    type: Number,
    required: true,
  },
});

const Produtos = mongoose.model<IProduto>('Produtos', produtosSchema);

export default Produtos;
