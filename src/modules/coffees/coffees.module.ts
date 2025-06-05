import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [ConfigModule]
})
export class CoffeesModule {}