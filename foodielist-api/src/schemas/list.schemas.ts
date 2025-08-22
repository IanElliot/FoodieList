import { z } from 'zod';
export const ListAddSchema = z.object({ name: z.string().min(1) });
export const ListPatchSchema = z.object({ checked: z.boolean().optional(), name: z.string().optional() });
