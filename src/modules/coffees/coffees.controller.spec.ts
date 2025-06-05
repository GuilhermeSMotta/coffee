import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';

describe('CoffeesController', () => {
  let appController: CoffeesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [],
    }).compile();

    appController = app.get<CoffeesController>(CoffeesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
