import supertest from 'supertest';
import db from '../../database';
import ProductModel from '../../models/product.model';
import Product from '../../types/product.type';
import app from '../../index';

const productModel = new ProductModel();
const request = supertest(app);

describe('Product API Endpoints', () => {
    const product = { id: 1, name: 'productOne', price: 20 } as Product;
    beforeAll(async () => {
        const createdProduct = await productModel.create(product);
        product.id = createdProduct.id;
    });
    afterAll(async () => {
        const connection = await db.connect();
        const sql =
            'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test CRUD API methods', () => {
        it('should create new product', async () => {
            const res = await request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .send({
                    name: 'productTwo',
                    price: 25,
                } as Product);
            expect(res.status).toBe(200);
            const { name, price } = res.body.data;
            expect(name).toBe('productTwo');
            expect(price).toBe(25);
        });

        it('should delete product', async () => {
            const res = await request
                .delete(`/api/products/${product.id}`)
                .set('Content-type', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(product.id);
            expect(res.body.data.name).toBe(`${product.name}`);
        });
    });
});
