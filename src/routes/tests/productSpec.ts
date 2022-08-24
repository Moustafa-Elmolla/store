import supertest from "supertest";
import db from '../../database';
import ProductModel from "../../models/product.model";
import Product from "../../types/product.type";
import app from "../../index";

const productModel = new ProductModel;
const request = supertest(app);

describe('Product API Endpoints', () => {
    const product = {name: 'productOne', price: 20,
    } as Product;
    beforeAll(async () => {
        const createdProduct = await productModel.create(product);
        product.id = createdProduct.id;
    });
    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM products;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test CRUD API methods', () => {
        it('should create new product', async () => {
            const res = await request.post('/api/products/').set('Content-type', 'application/json')
            .send({ name: 'productTwo', price: 25,
            } as Product);
            expect(res.status).toBe(200);
            const {name, price} = res.body.data;
            expect(name).toBe('productTwo');
            expect(price).toBe(25);
        });
        it('should get list of products', async () => {
            const res = await request.get('/api/products/').set('Content-type', 'application/json')
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        });
        it('should get product', async () => {
            const res = await request.get(`/api/products/${product.id}`).set('Content-type', 'application/json')
            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe(`${product.name}`);
            expect(res.body.data.price).toBe(`${product.price}`);
        });
        it('should update product', async () => {
            const res = await request.patch(`/api/products/${product.id}`).set('Content-type', 'application/json')
            .send({...product, name: 'productThree', price: 40});
            expect(res.status).toBe(200);
            const {id, name, price} = res.body.data;
            expect(id).toBe(product.id);
            expect(name).toBe('productThree');
            expect(price).toBe(40);
        });
        it('should delete product', async () => {
            const res = await request.delete(`/api/products/${product.id}`).set('Content-type', 'application/json')
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(product.id);
            expect(res.body.data.name).toBe(`${product.name}`);
        });
    });
});

