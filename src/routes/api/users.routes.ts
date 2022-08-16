import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import validToken from '../../middleware/auth.middleware';

const routes = Router();

routes.get('/', validToken, controllers.getMany);
routes.post('/', controllers.create);
routes.get('/:id', validToken, controllers.getOne);
routes.patch('/:id', validToken, controllers.updateOne);
routes.delete('/:id', validToken, controllers.deleteOne);
routes.post('/authenticate', validToken, controllers.authenticate);

export default routes;
