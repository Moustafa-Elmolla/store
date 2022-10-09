import { Router, Request, Response, NextFunction } from 'express';
import ProductModel from '../../models/product.model';
import validToken from '../../middleware/auth.middleware';

const routes = Router();
const productModel = new ProductModel();

// Creating
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Product Created Successfully',
        });
    } catch (error) {
        next(error);
    }
});
// Showing All
routes.get(
    '/',
    validToken,
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await productModel.getMany();
            res.json({
                status: 'success',
                data: products,
                message: 'Product retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);
// Showing one by ID
routes.get(
    '/:id',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productModel.getOne(
                req.params.id as unknown as number
            );
            res.json({
                status: 'success',
                data: product,
                message: 'Product retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);
// Update One by ID
routes.patch(
    '/:id',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productModel.updateOne(req.body);
            res.json({
                status: 'success',
                data: product,
                message: 'Product updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);
// Delete one by ID
routes.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productModel.deleteOne(
                req.params.id as unknown as number
            );
            res.json({
                status: 'success',
                data: product,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

export default routes;
