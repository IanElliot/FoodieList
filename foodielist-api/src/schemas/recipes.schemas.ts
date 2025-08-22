import { z } from 'zod';

export const IngestQuerySchema = z.object({ q: z.string().default('pasta'), n: z.coerce.number().min(1).max(50).default(30) });
export const SuggestQuerySchema = z.object({ maxMissing: z.coerce.number().min(0).max(5).default(3) });
export const SearchLiveQuerySchema = z.object({ q: z.string().default('pasta'), n: z.coerce.number().min(1).max(20).default(10) });
export const SaveRecipeSchema = z.object({ recipeId: z.number(), status: z.enum(['saved','ready']) });
