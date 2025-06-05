export class Coffee {
    nome: string;           // obrigatório
    tipo: string;           // obrigatório
    quantidade?: number;
    preco?: number;
    id: string;             // obrigatório
    descricao?: string;
    tags?: string[];
    dataCriacao?: string;
}