import { TimeController } from '->controllers/times.controller';
import { CreateTimeDto } from '->dtos/times.dto';
import { TimeService } from '->services/times.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TimeController', () => {
  let timeController: TimeController;
  let timeService: TimeService;
  const mockedTimes = [
    { id: 1, userId: 1, date: '2024-12-01', hours_worked: '8h:00m' },
    { id: 2, userId: 1, date: '2024-12-02', hours_worked: '7h:00m' },
  ];

  const mockTimeService = {
    getAllTimes: jest.fn().mockResolvedValue(mockedTimes),
    createTime: jest.fn().mockResolvedValue(mockedTimes[1]),
    getAllTimeById: jest.fn().mockResolvedValue(mockedTimes[1]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [
        {
          provide: TimeService,
          useValue: mockTimeService,
        },
      ],
    }).compile();

    timeController = module.get<TimeController>(TimeController);
    timeService = module.get<TimeService>(TimeService);
  });

  it('should be defined', () => {
    expect(timeController).toBeDefined();
    expect(timeService).toBeDefined();
  });

  it('should get all times', async () => {
    const result = await timeController.getAllTimes();
    expect(result).toEqual(mockedTimes);
    expect(mockTimeService.getAllTimes).toHaveBeenCalled();
  });

  it('should create a time entry', async () => {
    const createTimeDto: CreateTimeDto = mockedTimes[1];
    const result = await timeController.createTime(createTimeDto);
    expect(result).toEqual(mockedTimes[1]);
    expect(mockTimeService.createTime).toHaveBeenCalledWith(createTimeDto);
  });

  it('should get all times by user id', async () => {
    const result = await timeController.getAllTimeByUserId(2);
    expect(result).toEqual(mockedTimes[1]);
    expect(mockTimeService.getAllTimeById).toHaveBeenCalledWith(2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
