import { Router, Request, Response, NextFunction } from 'express';
import OrderModel from '../../models/order.model';
import validToken from '../../middleware/auth.middleware';

const routes = Router();
const orderModel = new OrderModel();

// Creating
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'order Created Successfully',
        });
    } catch (error) {
        next(error);
    }
});
// Showing All
routes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.getMany();
        res.json({
            status: 'success',
            data: orders,
            message: 'orders retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
});
// Showing one by ID
routes.get(
    '/:id',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await orderModel.getOne(
                req.params.id as unknown as string
            );
            res.json({
                status: 'success',
                data: order,
                message: 'order retrieved successfully',
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
            const order = await orderModel.deleteOne(
                req.params.id as unknown as string
            );
            res.json({
                status: 'success',
                data: order,
                message: 'order deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

export default routes;
