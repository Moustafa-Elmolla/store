import db from '../database';
import Product from '../types/product.type';

class ProductModel {
    // Create product
    async create(p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO Products (name, price) VALUES ($1, $2) RETURNING *;`;
            const result = await connection.query(sql, [p.name, p.price]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create (${p.name}): ${(error as Error).message}`
            );
        }
    }
    //get all products
    async getMany(): Promise<Product[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Error at retrieving products ${(error as Error).message}`
            );
        }
    }
    //get specific product
    async getOne(id: number): Promise<Product> {
        try {
            const sql = `SELECT * FROM products WHERE id=($1)`;
            const connection = await db.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not find product ${id}, ${(error as Error).message}`
            );
        }
    }
    //update product
    async updateOne(p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *`;
            const result = await connection.query(sql, [p.name, p.price, p.id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not update user: ${p.name}, ${(error as Error).message}`
            );
        }
    }
    //delete product
    async deleteOne(id: number): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM products WHERE id=($1) RETURNING id, name, price`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not delete product ${id}, ${(error as Error).message}`
            );
        }
    }
}

export default ProductModel;
