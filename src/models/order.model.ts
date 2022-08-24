import db from '../database';
import Order from '../types/order.type';

class OrderModel {
    // Create order
    async create(o: Order): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
            const result = await connection.query(sql, [o.status, o.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create (${o.status}): ${(error as Error).message}`);
        }
    };
    //get all orders
    async getMany(): Promise<Order[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error at retrieving orders ${(error as Error).message}`);
        }
    };
    //get specific order
    async getOne(id: string): Promise<Order> {
        try {
            const sql = `SELECT * FROM orders WHERE id=($1)`;
            const connection = await db.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find order ${id}, ${(error as Error).message}`);
        }
    };
    //delete order 
    async deleteOne(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM orders WHERE id=($1) RETURNING id, status, user_id`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete order ${id}, ${(error as Error).message}`);
        }
    };
}

export default OrderModel;
