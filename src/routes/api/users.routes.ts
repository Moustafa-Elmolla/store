import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';

const routes = Router();

routes.get('/', controllers.getMany);
routes.post('/', controllers.create);
routes.get('/:id', controllers.getOne);
routes.patch('/:id', controllers.updateOne);
routes.delete('/:id', controllers.deleteOne);

export default routes;
