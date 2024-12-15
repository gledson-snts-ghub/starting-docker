import { CreateTimeDto } from '->dtos/times.dto';
import { validate } from 'class-validator';

describe('Time Dto Validation', () => {
  it('should throw validation errors if required fields are invalid', async () => {
    const dto = new CreateTimeDto();

    dto.userId = undefined;
    dto.date = '';
    dto.hours_worked = 'invalid';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass validation if all fields are correct', async () => {
    const dto = new CreateTimeDto();

    dto.userId = 1;
    dto.date = '2024-12-14';
    dto.hours_worked = '7h:16m';

    const errors = await validate(dto);

    expect(errors.length).toEqual(0);
  });
});
