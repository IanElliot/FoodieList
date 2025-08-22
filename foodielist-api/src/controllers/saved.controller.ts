import { Request, Response, NextFunction } from 'express';
import { SavedService } from '@/services/saved.service';
import { SaveRecipeSchema } from '@/schemas/recipes.schemas';

export const SavedController = {
  all: async (_req: Request, res: Response) => res.json(await SavedService.all()),
  save: async (req: Request, res: Response, next: NextFunction) => {
    try { const body = SaveRecipeSchema.parse(req.body); res.json(await SavedService.save(body.recipeId, body.status)); }
    catch (e) { (e as any).status=422; next(e); }
  }
};
