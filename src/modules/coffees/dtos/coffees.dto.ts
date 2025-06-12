export class Coffee {
    nome: string;           // obrigatório
    tipo: string;           // obrigatório
    quantidade?: number;
    preco?: number;
    id?: number;             // obrigatório
    descricao?: string;
    tags?: string[];
    dataCriacao?: string;
}