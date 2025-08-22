import { Router } from 'express';
import { SavedController } from '@/controllers/saved.controller';

export const savedRouter = Router();

savedRouter.get('/', SavedController.all);
savedRouter.post('/', SavedController.save);
