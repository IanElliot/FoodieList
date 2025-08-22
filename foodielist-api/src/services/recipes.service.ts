import { normalize } from '@/utils/normalize';
import { RecipeRepo } from '@/repositories/recipe.repo';
import { spoonacularSearch } from './spoonacular.service';

export async function ingestRecipesFromAPI(query = 'pasta', number = 20) {
  const results = await spoonacularSearch(query, number);
  for (const r of results) {
    const recipe = await RecipeRepo.create({
      title: r.title,
      imageUrl: r.image ?? null,
      sourceUrl: (r as any).sourceUrl ?? (r as any).spoonacularSourceUrl ?? null,
      timeMin: r.readyInMinutes ?? null
    });

    const ingredients = (r.extendedIngredients ?? []).map(i => ({
      name: i.name ?? i.nameClean ?? i.originalName ?? '',
      quantity: typeof i.amount === 'number' ? i.amount : undefined,
      unit: typeof i.unit === 'string' ? i.unit : undefined
    }));

    for (const ing of ingredients) {
      if (!ing.name) continue;
      const nameNorm = normalize(ing.name);
      const dbIng = await RecipeRepo.upsertIngredientByNameNorm(nameNorm);
      await RecipeRepo.linkRecipeIngredient(recipe.id, dbIng.id, ing.quantity, ing.unit);
    }
  }
  return { count: results.length };
}

export async function seedMock() {
  const mock = [
    { title: 'Lemon Butter Pasta', timeMin: 20, ingredients: ['pasta','butter','lemon','parmesan','basil','salt'] },
    { title: 'Garlic Butter Shrimp', timeMin: 15, ingredients: ['shrimp','butter','garlic','lemon','parsley','salt'] },
    { title: 'Tomato Basil Soup', timeMin: 30, ingredients: ['tomato','onion','garlic','basil','cream'] }
  ];
  for (const r of mock) {
    const recipe = await RecipeRepo.create({ title: r.title, timeMin: r.timeMin, imageUrl: null, sourceUrl: null });
    for (const name of r.ingredients) {
      const dbIng = await RecipeRepo.upsertIngredientByNameNorm(name);
      await RecipeRepo.linkRecipeIngredient(recipe.id, dbIng.id);
    }
  }
}
