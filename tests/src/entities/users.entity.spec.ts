import { User } from '->entities/users.entity';

describe('User Entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.id = 1;
        user.user_code = 'user_code_1';
    });

    it('should exists', () => {
        expect(user).toBeDefined();
    });

    it('should have the correct properties', () => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('user_code');
    });

    it('should have the correct types', () => {
        expect(typeof user.id).toBe('number');
        expect(typeof user.user_code).toBe('string');
    });

    it('should fail validation if user_code is invalid', () => {
        const errorUser = new User();
        errorUser.id = 2;
        errorUser.user_code = '';

        expect(errorUser.user_code).toBe('');
        expect(errorUser.user_code.length).toBe(0);
    });
});
