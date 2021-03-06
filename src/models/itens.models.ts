import mongoose from 'mongoose';
import { IItens } from '../interfaces/itens.interfaces';

const itensSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produtos',
    required: true,
  },
  quantidade: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Campo "quantidade" deve ser um número inteiro',
    },
    required: true,
  },
});

const Itens = mongoose.model<IItens>('Itens', itensSchema);

export default Itens;
