import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CoffeesController],
  providers: [CoffeesService, PrismaService],
  exports: [ConfigModule]
})
export class CoffeesModule {}