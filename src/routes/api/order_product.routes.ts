import { Router, Request, Response, NextFunction } from 'express';
import OrderProductModel from '../../models/order_product.model';

const routes = Router();
const orderProductModel = new OrderProductModel();

//creating
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderproduct = await orderProductModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...orderproduct },
            message: 'OrderProduct Created Successfully',
        });
    } catch (error) {
        next(error);
    }
});
