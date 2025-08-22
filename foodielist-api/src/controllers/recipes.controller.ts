import { Request, Response, NextFunction } from 'express';
import { ingestRecipesFromAPI } from '@/services/recipes.service';
import { getSuggestions } from '@/services/suggest.service';
import { spoonacularSearch } from '@/services/spoonacular.service';
import { IngestQuerySchema, SuggestQuerySchema, SearchLiveQuerySchema } from '@/schemas/recipes.schemas';

export const RecipesController = {
  ingest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, n } = IngestQuerySchema.parse(req.query);
      const result = await ingestRecipesFromAPI(String(q), Number(n));
      res.json({ ok: true, ...result });
    } catch (e) { next(e); }
  },

  suggest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { maxMissing } = SuggestQuerySchema.parse(req.query);
      const data = await getSuggestions(Number(maxMissing));
      res.json(data);
    } catch (e) { next(e); }
  },

  searchLive: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, n } = SearchLiveQuerySchema.parse(req.query);
      const results = await spoonacularSearch(String(q), Number(n));
      const mapped = results.map(r => ({
        id: r.id,
        title: r.title,
        imageUrl: r.image ?? null,
        sourceUrl: (r as any).sourceUrl ?? (r as any).spoonacularSourceUrl ?? null,
        timeMin: r.readyInMinutes ?? null,
        ingredients: (r.extendedIngredients ?? []).map(i => i.name ?? i.nameClean ?? i.originalName ?? '').filter(Boolean)
      }));
      res.json({ query: q, results: mapped });
    } catch (e) { next(e); }
  }
};
