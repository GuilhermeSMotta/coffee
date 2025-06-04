import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';

export interface Coffee {
  nome: string;           // obrigatório
  tipo: string;           // obrigatório
  quantidade?: number;
  preco?: number;
  id: string;             // obrigatório
  descricao?: string;
  tags?: string[];
  dataCriacao?: string;
}

@Injectable()
export class AppService {
  private coffees: Coffee[] = JSON.parse(readFileSync('coffees.json', 'utf-8'));
  getHello(): string {
    return 'Hello World!';
  }
  getCoffees(): Coffee[] {
    return this.coffees;
  }
  getCoffeeById(id: string): Coffee | undefined {
    if (this.coffees.find(coffee => coffee.id === id) === undefined) {
      return {
        'nome': '404 - Café não encontrado!',
        'tipo': 'Erro',
        'id': id
      };
    } else {
      return this.coffees.find(coffee => coffee.id === id);
    }
  }
  getCoffeesQuery(tag: string): Coffee[] {
    if (!tag) {
      return this.coffees;
    }
    const filteredCoffees = this.coffees.filter(coffee => coffee.tags && coffee.tags.includes(tag));
    if (filteredCoffees.length === 0) {
      return [{
        'nome': '404 - Café não encontrado!',
        'tipo': 'Erro',
        'id': tag
      }];
    }
    return filteredCoffees;
  }
  getCoffeesQueryDate(dataInicial: string, dataFinal: string): Coffee[] {
    if (!dataInicial || !dataFinal) {
      return this.coffees;
    }
    const filteredCoffees = this.coffees.filter(coffee => {
      const dataCriacao = new Date(coffee.dataCriacao || '');
      return dataCriacao >= new Date(dataInicial) && dataCriacao <= new Date(dataFinal);
    });
    if (filteredCoffees.length === 0) {
      return [{
        'nome': '404 - Café não encontrado!',
        'tipo': 'Erro',
        'id': `${dataInicial}-${dataFinal}`
      }];
    }
    return filteredCoffees;
  }
  createCoffee(coffee: Coffee) {
    const existingCoffee = this.coffees.find(c => c.id === coffee.id);
    if (!coffee.nome || !coffee.tipo || !coffee.id) {
      return "400 - Bad Request: Campos obrigatórios não preenchidos!";
    }
    if (existingCoffee) {
      return "400 - Bad Request: Café já existe!";
    }
    this.coffees.push(coffee);
    writeFileSync('coffees.json', JSON.stringify(this.coffees, null, 2));
    const mensagem = {
      "mensagem": "201 - Café criado com sucesso!",
      "cafe": coffee
    }
    return mensagem;
  }
}

