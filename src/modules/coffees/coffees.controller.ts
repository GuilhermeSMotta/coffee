import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './dtos/coffees.dto';

@Controller()
export class CoffeesController {
  constructor(private readonly appService: CoffeesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/coffees')
  getCoffees() {
    return this.appService.getCoffees();
  }
  @Get('/coffees/:id/detalhes')
  getCoffeeById(@Param('id') id: number) {
    return this.appService.getCoffeeById(id);
  }
  @Get('/coffees-search')
  getCoffeeByQuery(@Query('tag') tag: string) {
    return this.appService.getCoffeesQuery(tag);
  }
  @Get('/coffees-search')
  getCoffeeByQueryDate(@Query('dataCriacao') dataInicial: string, dataFinal: string) {
    return this.appService.getCoffeesQueryDate(dataInicial, dataFinal);
  }
  @Get('/coffee-query-all')
  getCoffeeByQueryAll(@Query() coffee: Coffee) {
    console.log(coffee);
    return this.appService.getCoffeesQueryAll(coffee);
  }
  @Post('/coffees-create')
  createCoffee(@Body() coffee: Coffee) {
    return this.appService.createCoffee(coffee);
  }
  @Delete('/coffees/:id')
  deleteCoffee(@Param('id') id: number) {
    return this.appService.deleteCoffee(id);
  }
}
