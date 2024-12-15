import { CreateUserDto } from '->dtos/users.dto';
import { validate } from 'class-validator';

describe('CreateUserDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should validate user_code as a required field', async () => {
        const dto = new CreateUserDto();
        dto.user_code = '';

        const errors = await validate(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('user_code');
        expect(errors[0].constraints?.isNotEmpty).toBeDefined();
    });

    it('should validate user_code as a string with length between 1 and 255', async () => {
        const dto = new CreateUserDto();
        dto.user_code = 'a';

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    });

    it('should fail validation if user_code exceeds the max length of 255 characters', async () => {
        const dto = new CreateUserDto();
        dto.user_code = 'a'.repeat(256);

        const errors = await validate(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toEqual('user_code');
        expect(errors[0].constraints?.isLength).toEqual(
            'user_code must be shorter than or equal to 255 characters',
        );
    });

    it('should pass validation if user_code is within valid length', async () => {
        const dto = new CreateUserDto();
        dto.user_code = 'valid_user_code';

        const errors = await validate(dto);

        expect(errors.length).toBe(0);
    });
});
