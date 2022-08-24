import ProductModel from "../product.model";
import Product from "../../types/product.type";
import db from '../../database';

const productModel = new ProductModel();

describe('Product Model', () => {
    describe('Test methods exist', () => {
        it('should have Get Many Products method', () => {
            expect(productModel.getMany).toBeDefined();
        });
        it('should have Get One User method', () => {
            expect(productModel.getOne).toBeDefined();
        });
        it('should have Create User method', () => {
            expect(productModel.create).toBeDefined();
        });
        it('should have Update User method', () => {
            expect(productModel.updateOne).toBeDefined();
        });
        it('should have Delete User method', () => {
            expect(productModel.deleteOne).toBeDefined();
        });
    });
    describe('Test Product Model Logic', () => {
        const product = {
            name: 'productOne',
            price: 20,
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
        it('Create method should return new Product', async () => {
            const createdProduct = await productModel.create({
                name: 'productTwo',
                price: 25,
            } as Product);
            expect(createdProduct).toEqual({
                id: createdProduct.id,
                name: 'productTwo',
                price: 25,
            } as Product);
        });
        it('Get Many method should return All available products in Database', async () =>{
            const products = await productModel.getMany();
            expect(products.length).toBe(2);
        });
        it('Get One method should return nameproduct when called with ID', async () => {
            const returnedProduct = await productModel.getOne(product.id as string);
            expect(returnedProduct.id).toBe(product.id);
            expect(returnedProduct.name).toBe(product.name);
            expect(returnedProduct.price).toBe(product.price);
        });
        it('Update One method should return product with edited attributes', async () => {
            const updatedProduct = await productModel.updateOne({
                ...product,
                name: 'nameproduct updated',
                price: 30,
            });
            expect(updatedProduct.id).toBe(product.id);
            expect(updatedProduct.name).toBe('nameproduct updated');
            expect(updatedProduct.price).toBe(30);
        });
        it('Delete One method should delete product from database', async () => {
            const deletedPrduct = await productModel.deleteOne(product.id as string);
            expect(deletedPrduct.id).toBe(product.id);
        });
    })
})
