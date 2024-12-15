import { CreateTimeDto } from '->dtos/times.dto';
import { Time } from '->entities/times.entity';
import { User } from '->entities/users.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TimeService } from 'src/services/times.service';
import { Repository } from 'typeorm';

const mockTimeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
};

const mockUserRepository = {
    findOne: jest.fn(),
};

describe('TimeService', () => {
    let service: TimeService;
    let timeRepository: Repository<Time>;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TimeService,
                {
                    provide: getRepositoryToken(Time),
                    useValue: mockTimeRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<TimeService>(TimeService);
        timeRepository = module.get<Repository<Time>>(getRepositoryToken(Time));
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTime', () => {
        it('should create and save a time register successful', async () => {
            const createTimeDto: CreateTimeDto = {
                userId: 1,
                date: '12/08/2004',
                hours_worked: '2h:03mm',
            };

            const user = { id: 1 } as User;
            const time = { id: 1, ...createTimeDto } as Time;

            mockUserRepository.findOne.mockResolvedValue(user);
            mockTimeRepository.create.mockReturnValue(time);
            mockTimeRepository.save.mockResolvedValue(time);

            const result = await service.createTime(createTimeDto);

            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: createTimeDto.userId },
            });
            expect(timeRepository.create).toHaveBeenCalledWith(createTimeDto);
            expect(timeRepository.save).toHaveBeenCalledWith(time);
            expect(result).toEqual(time);
        });

        it('must throw a error if the user not exist', async () => {
            const createTimeDto: CreateTimeDto = {
                userId: 2,
                date: '22/01/2012',
                hours_worked: '3h:19mm',
            };

            mockUserRepository.findOne.mockResolvedValue(null);

            await expect(service.createTime(createTimeDto)).rejects.toThrow(
                'Usuário não encontrado',
            );
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: createTimeDto.userId },
            });
        });
    });

    describe('getAllTimeById', () => {
        it('should return all times by id', async () => {
            const userId = 1;
            const times = [
                { userId: 2, date: '22/01/2012', hours_worked: '3h:19mm' },
            ] as Time[];

            mockTimeRepository.find.mockResolvedValue(times);

            const result = await service.getAllTimeById(userId);

            expect(timeRepository.find).toHaveBeenCalledWith({
                where: { userId },
            });
            expect(result).toEqual(times);
        });
    });

    describe('getAllTimes', () => {
        it('should return all times', async () => {
            const times = [
                { userId: 2, date: '22/01/2012', hours_worked: '3h:19mm' },
                { userId: 1, date: '12/08/2004', hours_worked: '2h:03mm' },
            ] as Time[];

            mockTimeRepository.find.mockResolvedValue(times);

            const result = await service.getAllTimes();

            expect(timeRepository.find).toHaveBeenCalled();
            expect(result).toEqual(times);
        });
    });
});
