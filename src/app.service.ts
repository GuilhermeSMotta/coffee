import { Injectable } from '@nestjs/common';

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
  private coffees: Coffee[] = [
    {
      nome: 'Café Arábica',
      tipo: 'grão',
      quantidade: 100,
      preco: 10.5,
      id: '1',
      descricao: 'Café Arábica de alta qualidade.',
      tags: ['aroma', 'sabor'],
    },
    {
      nome: 'Café Robusta',
      tipo: 'moído',
      quantidade: 50,
      preco: 8.0,
      id: '2',
      descricao: 'Café Robusta forte e encorpado.',
      tags: ['intenso', 'cafeína'],
    }
  ];
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
    return "Café adicionado com sucesso!";
  }
}
