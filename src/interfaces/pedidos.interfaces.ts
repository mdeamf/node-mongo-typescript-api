import { IItens } from "./itens.interfaces";

interface IPedido {
  descricao: string;
  data: string;
  valor_total: number;
}

export interface IPedidoBody extends IPedido {
  itens: IItens[];
}

export interface IPedidoModel extends IPedido {
  itens: string[];
}