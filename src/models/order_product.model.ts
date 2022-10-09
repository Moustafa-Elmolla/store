import db from '../database';
import OrderProduct from '../types/orderProducts.type';

class OrderProductModel {
    async create(o: OrderProduct): Promise<OrderProduct> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING quantity;`;
            const result = await connection.query(sql, [
                o.quantity,
                o.order_id,
                o.product_id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create (${o.product_id}): ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default OrderProductModel;
