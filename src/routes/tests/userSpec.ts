import supertest from 'supertest';
import db from '../../database';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import app from '../../index';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('User API Endpoints', () => {
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
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
        await connection.query(sql);
        connection.release();
    });
    describe('Test Authenticate method', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({ email: 'test@test.com', password: 'moustafa@91' });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        });
        it('should be failed to authenticate with wrong email', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    email: 'email@email.com',
                    password: 'moustafa@91',
                });
            expect(res.status).toBe(401);
        });
    });
    describe('Test CRUD API methods', () => {
        it('should create new user', async () => {
            const res = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .send({
                    email: 'test@test.com',
                    user_name: 'testuser',
                    first_name: 'moustafa',
                    last_name: 'molla',
                    password: 'moustafa@91',
                } as User);
            expect(res.status).toBe(200);
            // const { email, user_name, first_name, last_name } = res.body.data;
            // expect(email).toBe('test@test.com');
            // expect(user_name).toBe('testuser');
            // expect(first_name).toBe('moustafa');
            // expect(last_name).toBe('molla');
        });
        it('should get list of users', async () => {
            const res = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // expect(res.body.data.length).toBe(2);
        });
        it('should get user', async () => {
            const res = await request
                .get(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // expect(res.body.data.user_name).toBe('testuser');
            // expect(res.body.data.email).toBe('test@test.com');
        });
        it('should update user', async () => {
            const res = await request
                .patch(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    user_name: 'moustafaelmolla',
                    first_name: 'moustafa',
                    last_name: 'elmolla',
                });
            expect(res.status).toBe(200);
            // const { id, email, user_name, first_name, last_name } =
            //     res.body.data;
            // expect(id).toBe(user.id);
            // expect(email).toBe(user.email);
            // expect(user_name).toBe('moustafaelmolla');
            // expect(first_name).toBe('moustafa');
            // expect(last_name).toBe('elmolla');
        });
        it('should delete user', async () => {
            const res = await request
                .delete(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // expect(res.body.data.id).toBe(user.id);
            // expect(res.body.data.user_name).toBe('moustafaelmolla');
        });
    });
});
