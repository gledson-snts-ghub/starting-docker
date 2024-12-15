import { User } from '->entities/users.entity';
import { UsersService } from '->services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
};

describe('User service', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create user', () => {
    it('should create the team successfully', async () => {
      const user = { id: 1, user_code: '3f363g7u' };

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);

      const userCreated = await service.create(user);

      expect(userRepository.create).toHaveBeenCalledWith(user);
      expect(userCreated).toEqual(user);
    });

    it('should return error with user_code length 0', async () => {
      const user = { id: 1, user_code: '' };

      mockUserRepository.create.mockRejectedValue(user);
      mockUserRepository.save.mockRejectedValue(user);

      expect(service.create(user)).rejects.toThrow('User code not found');
    });

    it('should return error with user_code empty', async () => {
      const user = { id: 1, user_code: undefined };

      mockUserRepository.create.mockRejectedValue(user);
      mockUserRepository.save.mockRejectedValue(user);

      expect(service.create(user)).rejects.toThrow('User code not found');
    });
  });

  describe('Get user by id', () => {
    it('should throw an exception when the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.getById(1)).rejects.toThrow(
        'User with id 1 not found',
      );
    });

    it('should return a user successfully', async () => {
      const userMocked = {
        id: 1,
        user_code: 'saçlfj',
      } as User;
      mockUserRepository.findOneBy.mockResolvedValue(userMocked);

      const user = await service.getById(1);

      expect(user).toEqual(userMocked);
    });
  });

  describe('Login', () => {
    it('should return successfully', async () => {
      const userMocked = {
        id: 3,
        user_code: 'yuf4',
      } as User;

      mockUserRepository.findOneBy.mockResolvedValue(userMocked);

      const result = await service.login('yuf4');

      expect(result.user_code).toEqual(userMocked.user_code);
    });

    it('should return error when user_code not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.login('yuf5')).rejects.toThrow(
        'User with user_code yuf5 not found',
      );
    });
  });

  describe('Find all', () => {
    it('should return all users', async () => {
      const users: User[] = [
        { id: 1, user_code: 'asdf' },
        {
          id: 2,
          user_code: 'asdg',
        },
        { id: 3, user_code: 'asdh' },
      ];

      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result.length).toEqual(3);
      expect(result).toEqual(users);
    });
  });
});
