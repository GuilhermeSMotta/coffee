import { Body, Controller, Get, Post } from '@nestjs/common';
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
  @Get('/coffees/:id')
  getCoffeeById(id: string) {
    return this.appService.getCoffeeById(id);
  }
  @Post('/coffees')
  createCoffee(@Body() coffee: Coffee) {
    this.appService.createCoffee(coffee);
  }
}
