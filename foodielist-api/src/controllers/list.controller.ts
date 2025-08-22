import { Request, Response, NextFunction } from 'express';
import { ListService } from '@/services/list.service';
import { ListAddSchema, ListPatchSchema } from '@/schemas/list.schemas';

export const ListController = {
  all: async (_req: Request, res: Response) => res.json(await ListService.all()),
  add: async (req: Request, res: Response, next: NextFunction) => {
    try { const body = ListAddSchema.parse(req.body); res.json(await ListService.add(body.name)); }
    catch (e) { (e as any).status=422; next(e); }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try { const id = Number(req.params.id); const body = ListPatchSchema.parse(req.body); res.json(await ListService.patch(id, body)); }
    catch (e) { (e as any).status=422; next(e); }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try { const id = Number(req.params.id); await ListService.remove(id); res.json({ ok: true }); }
    catch (e) { next(e); }
  }
};
