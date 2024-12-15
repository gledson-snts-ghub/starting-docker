import { Time } from '->entities/times.entity';

describe('Time Entity', () => {
    let time: Time;

    beforeAll(() => {
        time = new Time();
        time.id = 1;
        time.userId = 10;
        time.date = '2024-12-14';
        time.hours_worked = '8h:12m';
    });

    it('should exists', () => {
        expect(time).toBeDefined();
    });

    it('should have the correct properties', () => {
        expect(time).toHaveProperty('id');
        expect(time).toHaveProperty('userId');
        expect(time).toHaveProperty('date');
        expect(time).toHaveProperty('hours_worked');
    });

    it('should have the correct types', () => {
        expect(typeof time.userId).toBe('number');
        expect(typeof time.date).toBe('string');
        expect(typeof time.hours_worked).toBe('string');
    });
});
