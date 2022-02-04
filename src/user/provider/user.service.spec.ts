import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';
import { DbService } from '../../shared/services/db/db.service';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';

describe('User provider test', () => {
  let provider: UserService;
  let db: DbService;
  let bcrypt: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DbService,
          useValue: {
            addNewUser: jest.fn((user: UserDto) => user),
          },
        },
        {
          provide: BcryptService,
          useValue: {
            encodePassword: jest.fn(() => 'hash'),
          },
        },
      ],
    }).compile();

    provider = module.get<UserService>(UserService);
    db = module.get<DbService>(DbService);
    bcrypt = module.get<BcryptService>(BcryptService);
  });

  describe('All dependencies should be defined', () => {
    it('Provider should be defined', () => {
      expect(provider).toBeDefined();
    });
    it('db should be defined', () => {
      expect(db).toBeDefined();
    });
    it('bcrypt should be defined', () => {
      expect(bcrypt).toBeDefined();
    });
  });

  describe('Create a user', () => {
    it('should use db service to add new user', async () => {
      provider.createUser({
        email: 'test@gmail.com',
        password: '12345',
      });
      expect(db.addNewUser).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: await bcrypt.encodePassword('12345'),
      });
    });

    // mock bcrypt
    it('should encode the user password correctly', async () => {
      const userDto = {
        email: 'test@gmail.com',
        password: await bcrypt.encodePassword('12345'),
      };
      provider.createUser(userDto);
      expect(db.addNewUser(userDto)).toStrictEqual({
        email: 'test@gmail.com',
        password: 'hash',
      });
    });
  });

  describe('Update user', () => {});
  describe('Disable user', () => {});
});
