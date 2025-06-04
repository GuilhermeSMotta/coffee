import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService, Coffee } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/coffees')
  getCoffees() {
    return this.appService.getCoffees();
  }
  @Get('/coffees/:id/detalhes')
  getCoffeeById(@Param('id') id: string) {
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
  @Post('/coffees-create')
  createCoffee(@Body() coffee: Coffee) {
    return this.appService.createCoffee(coffee);
  }
}
