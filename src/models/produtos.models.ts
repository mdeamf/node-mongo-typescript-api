import mongoose from 'mongoose';

export interface Produto {
  descricao: string;
  valor_unit: number;
}

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

const Produtos = mongoose.model<Produto>('Produtos', produtosSchema);

export default Produtos;
