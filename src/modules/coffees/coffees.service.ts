import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import { Coffee } from './dtos/coffees.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [];

  constructor(private readonly prisma: PrismaService) {
    this.initializeCoffees();
  }

  private async initializeCoffees() {
    this.coffees = await this.prisma.coffee.findMany({
      select: {
        nome: true,
        tipo: true,
        preco: true,
        id: true,
        descricao: true,
        tags: true
      }
    }) as unknown as Coffee[];
  }


  //private coffees: Coffee[] = JSON.parse(readFileSync('coffees.json', 'utf-8'));
  getHello(): string {
    return 'Hello World!';
  }
  getCoffees(): Coffee[] {
    if (this.coffees.length === 0) {
      return [{
        'nome': '404 - Café não encontrado!',
        'tipo': 'Erro',
        'id': 0
      }];
    }
    return this.coffees;
  }
  getCoffeeById(id: number): Coffee | undefined {
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
        'id': 0
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
        'tipo': `Erro - ${dataInicial}-${dataFinal}`,
        'id': 0
      }];
    }
    return filteredCoffees;
  }
  getCoffeesQueryAll(coffee: Coffee): Coffee[] {
    const { nome, tipo, quantidade, preco, id, descricao, tags, dataCriacao } = coffee;
    const filteredCoffees = this.coffees.filter(c => {
      return (!nome || c.nome.includes(nome)) &&
             (!tipo || c.tipo.includes(tipo)) &&
             (quantidade === undefined || c.quantidade === quantidade) &&
             (preco === undefined || c.preco === preco) &&
             (!id || c.id === id) &&
             (!descricao || c.descricao?.includes(descricao)) &&
             (!tags || (c.tags && c.tags.some(tag => tags.includes(tag)))) &&
             (!dataCriacao || new Date(c.dataCriacao || '') >= new Date(dataCriacao));
    });
    if (filteredCoffees.length === 0) {
      return [{
        'nome': '404 - Café não encontrado!',
        'tipo': 'Erro',
        'id': id || 0
      }];
    }
    return filteredCoffees;
  }
  createCoffee(coffee: Coffee) {
    const existingCoffee = this.coffees.find(c => c.nome === coffee.nome);
    if (!coffee.nome || !coffee.tipo) {
      return "400 - Bad Request: Campos obrigatórios não preenchidos!";
    }
    if (existingCoffee) {
      return "400 - Bad Request: Café já existe!";
    }
    // Adiciona café à lista e salva no prisma
    this.prisma.coffee.create({
      data: {
        nome: coffee.nome,
        tipo: coffee.tipo,
        preco: Number(coffee.preco),
        descricao: String(coffee.descricao),
        tags: coffee.tags
          ? {
              create: coffee.tags.map(tag => ({ nome: tag }))
            }
          : undefined
      }
    }).catch(error => {
      console.error("Erro ao criar café no banco de dados:", error);
      return "500 - Internal Server Error: Erro ao criar café no banco de dados!";
    });
    const mensagem = {
      "mensagem": "201 - Café criado com sucesso!",
      "cafe": coffee
    }
    return mensagem;
  }
  async deleteCoffee(id: number) {
  const coffeeIndex = this.coffees.findIndex(coffee => coffee.id === Number(id));
  if (coffeeIndex === -1) {
    return "404 - Café não encontrado!";
  }

  try {
    // Primeiro, remova as relações de tags (ajuste o nome do modelo conforme seu schema)
    await this.prisma.tagCafe.deleteMany({
      where: { id: Number(id) }
    });

    // Agora, remova o café
    await this.prisma.coffee.delete({
      where: { id: Number(id) }
    });

    this.coffees.splice(coffeeIndex, 1);
    return "200 - Café deletado com sucesso!";
  } catch (error) {
    console.error("Erro ao deletar café no banco de dados:", error);
    return "500 - Internal Server Error: Erro ao deletar café no banco de dados!";
  }
}
}

