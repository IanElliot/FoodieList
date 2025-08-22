import { RecipeRepo } from '@/repositories/recipe.repo';
export const SavedService={ all:()=>RecipeRepo.getSaved(), save:(recipeId:number,status:'saved'|'ready')=>RecipeRepo.upsertSaved(recipeId,status) };
