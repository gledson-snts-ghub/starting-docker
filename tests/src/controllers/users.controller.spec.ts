import { UsersController } from '->controllers/users.controller';
import { CreateUserDto } from '->dtos/users.dto';
import { UsersService } from '->services/users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersController', () => {
    let usersController: UsersController;

    const mockedUsers = [
        { id: 1, user_code: 'user1' },
        { id: 2, user_code: 'user2' },
        { id: 3, user_code: 'user3' },
    ];

    const mockUsersService = {
        create: jest.fn().mockImplementation((dto: CreateUserDto) => ({
            id: mockedUsers.length + 1,
            ...dto,
        })),
        findAll: jest.fn().mockResolvedValue(mockedUsers),
        getById: jest
            .fn()
            .mockImplementation((id: number) =>
                mockedUsers.find((user) => user.id === id),
            ),
        login: jest
            .fn()
            .mockImplementation((user_code: string) =>
                mockedUsers.find((user) => user.user_code === user_code),
            ),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
    });

    it('should exists', () => {
        expect(usersController).toBeDefined();
    });

    it('should create a user', async () => {
        const createUserDto: CreateUserDto = { user_code: '2o3u1y' };
        const result = await usersController.create(createUserDto);
        expect(result).toEqual({
            id: mockedUsers.length + 1,
            user_code: '2o3u1y',
        });
    });

    it('should find all users', async () => {
        const result = await usersController.findAll();
        expect(result).toEqual({ users: mockedUsers });
    });

    it('should find a user by id', async () => {
        const result = await usersController.findById(1);
        expect(result).toEqual(mockedUsers[0]);
    });

    it('should login', async () => {
        const user_code = 'user1';
        const result = await usersController.login({ user_code });
        expect(result).toEqual(mockedUsers[0]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
