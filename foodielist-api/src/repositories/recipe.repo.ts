import { prisma } from '@/lib/prisma';

export const RecipeRepo = {
  create: (data: { title: string; imageUrl?: string | null; sourceUrl?: string | null; timeMin?: number | null }) =>
    prisma.recipe.create({ data }),

  upsertIngredientByNameNorm: (nameNorm: string) =>
    prisma.ingredient.upsert({ where: { nameNorm }, update: {}, create: { nameNorm } }),

  linkRecipeIngredient: (recipeId: number, ingredientId: number, quantity?: number | null, unit?: string | null) =>
    prisma.recipeIngredient.create({ data: { recipeId, ingredientId, quantity: quantity ?? undefined, unit: unit ?? undefined } }),

  allWithIngredients: () =>
    prisma.recipe.findMany({ include: { ingredients: { include: { ingredient: true } } } }),

  getSaved: () => prisma.savedRecipe.findMany({ include: { recipe: true } }),

  upsertSaved: (recipeId: number, status: 'saved' | 'ready') =>
    prisma.savedRecipe.upsert({ where: { recipeId }, update: { status }, create: { recipeId, status } })
};
