import db from '../database';

class dashboardQueries {
    async productsInOrders(): Promise<
        { name: string; price: number; order_id: string }[]
    > {
        try {
            const connection = await db.connect();
            const sql =
                'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable get products and orders: ${(error as Error).message}`
            );
        }
    }
}

export default dashboardQueries;
