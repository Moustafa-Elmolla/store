import { Router } from 'express';
import usersRoutes from './api/users.routes';
import productsRoutes from './api/products.routes';
import orderRoutes from './api/orders.routes';
import dashboardRoutes from './api/dashboard.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', orderRoutes);
routes.use('/products_in_orders', dashboardRoutes);


export default routes;
