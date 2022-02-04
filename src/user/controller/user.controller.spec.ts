import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../provider/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const ApiServiceProvider = {
    provide: UserService,
    useFactory: () => ({
      getAll: jest.fn(() => []),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all users', () => {
    it('should call user service getAll', () => {
      controller.getAll();
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('create a new user', () => {
    it('should call user service create', () => {
      // TODO: Create utils for rnd email & pwd
      controller.createUser({
        email: 'test@gmail.com',
        password: '12345',
      });
      expect(service.createUser).toHaveBeenCalled();
    });
  });
});
