import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.coffee.deleteMany({});
    await prisma.coffee.createMany({
        data: [
            {
                nome: "Café Americano",
                tipo: "Americano",
                preco: 5.0,
                descricao: "Café americano com água quente."
            },
            {
                nome: "Cappuccino",
                tipo: "Espresso",
                preco: 7.5,
                descricao: "Café expresso com leite vaporizado e espuma."
            },
            {
                nome: "Latte",
                tipo: "Espresso",
                preco: 6.0,
                descricao: "Café expresso com leite vaporizado."
            }
        ]
    });
    console.log("Cafés criados com sucesso!");
}