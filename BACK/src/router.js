import express from 'express';
import { list, show, create, update, remove, myLogger, validate } from  './controllers/CardController.js';

const routes = express.Router();

routes.get('/cards', list);
routes.post('/cards', create);

routes.use('/cards/:id', validate);
routes.use('/cards/:id', myLogger);

routes.get('/cards/:id', show);
routes.put('/cards/:id', update);
routes.delete('/cards/:id', remove);

export default routes;