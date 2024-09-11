import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { AppModule } from '../../app.module';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create a new user', async () => {
      const user = { email: 'foo@bar.com', name: 'test' };
      const userDB = await prisma.users.create({ data: user });

      expect(userDB.email).toBe(user.email);
      expect(userDB.name).toBe(user.name);
    });
    it('should throw on duplicate email', async () => {
      try {
        const user = { email: 'foo@bar.com', name: 'test' };
        await userService.create(user);
      } catch (error) {
        console.log(error);
        expect(error.status).toBe(403);
        expect(error.message).toBe('User already exists');
      }
    });
    it('should throw on invalid arguments to create a user', async () => {
      try {
        const user = { email: 'foo@bar.com', name: 'test', status: true };
        await userService.create(user);
      } catch (error) {
        console.log(error);
        expect(error.status).toBe(403);
        expect(error.message).toBe('Invalid arguments to create a Users');
      }
    });
  });
});
