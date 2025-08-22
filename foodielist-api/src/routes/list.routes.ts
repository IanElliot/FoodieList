import { Router } from 'express';
import { ListController } from '@/controllers/list.controller';

export const listRouter = Router();

listRouter.get('/', ListController.all);
listRouter.post('/', ListController.add);
listRouter.patch('/:id', ListController.patch);
listRouter.delete('/:id', ListController.delete);
