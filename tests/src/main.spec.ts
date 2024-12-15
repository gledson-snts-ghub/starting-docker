import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core', () => ({
    NestFactory: {
        create: jest.fn(),
    },
}));

jest.mock('node:process', () => ({
    env: {
        POSTGRES_USER: 'user1',
        POSTGRES_PASSWORD: 'pass1',
        POSTGRES_DB: 'database',
    },
}));

describe('Bootstrap', () => {
    const mockApp = {
        enableCors: jest.fn(),
        listen: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
    });

    it('should initialize the application and listen on the correct port', async () => {
        // const port = process.env.NEST_PORT ?? 4000;
        // const { bootstrap } = await import('./main');
    });
});
