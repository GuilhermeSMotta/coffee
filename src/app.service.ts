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
    return this.coffees.find(coffee => coffee.id === id);
  }
  createCoffee(coffee: Coffee) {
    const existingCoffee = this.coffees.find(c => c.id === coffee.id);
    if (existingCoffee) {
      return "Café já existe!";
    }
    this.coffees.push(coffee);
    writeFileSync('coffees.json', JSON.stringify(this.coffees, null, 2));
    const mensagem = {
      "mensagem": "Café criado com sucesso!",
      "cafe": coffee
    }
    return mensagem;
  }
}

