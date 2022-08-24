import UserModel from "../user.model";
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('Authentication Module', () => {
    describe('Test methods exists', () => {
        it('should have an Authenticate User method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test Authentication Logic', () => {
        const user = {
            email: 'test@test.com',
            user_name: 'testuser',
            first_name: 'moustafa',
            last_name: 'molla',
            password: 'moustafa@91',
        } as User;
        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            user.id = createdUser.id;
        });
        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });
        it('Authenticate method should return the authentecated user', async () => {
            const authentecatedUser = await userModel.authenticate
            (user.email, user.password as string);
            expect(authentecatedUser?.email).toBe(user.email);
            expect(authentecatedUser?.user_name).toBe(user.user_name);
            expect(authentecatedUser?.first_name).toBe(user.first_name);
            expect(authentecatedUser?.last_name).toBe(user.last_name);
        });
        it('Authenticate method should return null', async () => {
            const authentecatedUser = await userModel.authenticate('moustafa@elmolla.com','any-password');
            expect(authentecatedUser).toBe(null);
        });
    });
});
