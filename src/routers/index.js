import { Router } from 'express';
import {authenticate} from '../middlewares/authenticate.js';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/contacts', authenticate, contactsRouter);


export default routes;