import UserModel from '../user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model', () => {
    describe('Test methods exist', () => {
        it('should have Get Many Users method', () => {
            expect(userModel.getMany).toBeDefined();
        });
        it('should have Get One User method', () => {
            expect(userModel.getOne).toBeDefined();
        });
        it('should have Create User method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have Update User method', () => {
            expect(userModel.updateOne).toBeDefined();
        });
        it('should have Delete User method', () => {
            expect(userModel.deleteOne).toBeDefined();
        });
        it('should have Authenticate User method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test User Model Logic', () => {
        const userCreated = {
            email: 'test@test.com',
            user_name: 'testuser',
            first_name: 'test',
            last_name: 'user',
            password: 'test123',
        } as User;
        beforeAll(async () => {
            const createdUser = await userModel.create(userCreated);
            userCreated.id = createdUser.id;
        });
        afterAll(async () => {
            const connection = await db.connect();
            const sql = `DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
            await connection.query(sql);
            connection.release();
        });
        it('Create method should return new User', async () => {
            const createdUser = await userModel.create({
                email: 'test2@test.com',
                user_name: 'testuser2',
                first_name: 'moustafa',
                last_name: 'molla',
                password: 'test_user',
            } as User);
            expect(createdUser).toEqual({
                id: createdUser.id,
                email: 'test2@test.com',
                user_name: 'testuser2',
                first_name: 'moustafa',
                last_name: 'molla',
            } as User);
        });
        it('Get Many method should return All available users in Database', async () => {
            const users = await userModel.getMany();
            expect(users.length).toBe(2);
        });
        it('Get One method should return testuser when called with ID', async () => {
            const returnedUser = await userModel.getOne(
                userCreated.id as number
            );
            expect(returnedUser.id).toBe(userCreated.id);
            expect(returnedUser.email).toBe(userCreated.email);
            expect(returnedUser.user_name).toBe(userCreated.user_name);
            expect(returnedUser.first_name).toBe(userCreated.first_name);
            expect(returnedUser.last_name).toBe(userCreated.last_name);
        });
        it('Update One method should return user with edited attributes', async () => {
            const updatedUser = await userModel.updateOne({
                ...userCreated,
                user_name: 'testuser_updated',
                first_name: 'fouad',
                last_name: 'elmolla',
            });
            expect(updatedUser.id).toBe(userCreated.id);
            expect(updatedUser.email).toBe(userCreated.email);
            expect(updatedUser.user_name).toBe('testuser_updated');
            expect(updatedUser.first_name).toBe('fouad');
            expect(updatedUser.last_name).toBe('elmolla');
        });
        it('Delete One method should delete user from database', async () => {
            const deletedUser = await userModel.deleteOne(
                userCreated.id as unknown as string
            );
            expect(deletedUser.id).toBe(userCreated.id);
        });
    });
});
