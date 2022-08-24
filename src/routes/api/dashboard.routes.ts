import { Request, Response, Router } from 'express';
import dashboardQueries from '../../services/dashboard';

const routes = Router();
const dashboard = new dashboardQueries();

routes.get('/', async (_req: Request, res: Response) => {
    const products = await dashboard.productsInOrders()
    res.json({status: 'success', data: products});
})

export default routes;
