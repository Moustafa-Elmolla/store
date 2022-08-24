import db from '../../database';
import Order from '../../types/order.type';
import OrderModel from '../order.model';
import User from "../../types/user.type";
import Product from '../../types/product.type';

const orderModel = new OrderModel();

let user: User;
let product: Product;

describe('Order Model', () => {
    describe('Test methods exist', () => {
        it('should have Get Many orders method', () => {
            expect(orderModel.getMany).toBeDefined();
        });
        it('should have Get One order method', () => {
            expect(orderModel.getOne).toBeDefined();
        });
        it('should have Create new order method', () => {
            expect(orderModel.create).toBeDefined();
        });
        it('should have Delete order method', () => {
            expect(orderModel.deleteOne).toBeDefined();
        });
    });
    beforeAll(async () => {
        // creating user
        const connection = await db.connect();
        const userSql = 'INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const result1 = await connection.query(userSql, ['mm@test', 'testuser', 'modi', 'user', '123']);
        user = result1.rows[0];
        
        // creating product
        const productSql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;';
        const result2 = await connection.query(productSql, ['test product', 15]);
        product = result2.rows[0];
    })
    afterAll(async () => {
        const connection = await db.connect();
        await connection.query('DELETE FROM order_products;');
        await connection.query(`DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;`);
        await connection.query('DELETE FROM products;')
        await connection.query('DELETE FROM users;')
    })
    it('Create method should return new Order', async () => {
        const createdOrder = await orderModel.create({
            user_id: 1,
            status: 'active'
        });
        expect(createdOrder).toEqual({
            id: 1,
            user_id: 1,
            status: 'active',
        })
    });
    it('Get Many method should return All available orders in Database', async () => {
        const orders = await orderModel.getMany();
        expect(orders).toEqual([]);
    });
});
