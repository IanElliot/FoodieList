import { ListRepo } from "@/repositories/list.repo";
import { RecipeRepo } from "@/repositories/recipe.repo";

const ASSUMED_PANTRY = new Set([
  "salt",
  "pepper",
  "olive oil",
  "oil",
  "water",
  "sugar",
  "flour",
]);

export type Candidate = {
  id: number;
  title: string;
  imageUrl?: string | null;
  sourceUrl?: string | null;
  timeMin?: number | null;
  haveCount: number;
  total: number;
  missing: string[];
  score: number;
};

export function computeCandidates(
  have: Set<string>,
  recipes: Array<{
    id: number;
    title: string;
    imageUrl?: string | null;
    sourceUrl?: string | null;
    timeMin?: number | null;
    ingredients: string[];
  }>
): Candidate[] {
  const cands = recipes
    .map((r) => {
      const missing = r.ingredients.filter(
        (n) => !have.has(n) && !ASSUMED_PANTRY.has(n)
      );
      const haveCount = r.ingredients.length - missing.length;
      const jaccard = haveCount / new Set([...r.ingredients, ...have]).size;
      return {
        id: r.id,
        title: r.title,
        imageUrl: r.imageUrl ?? null,
        sourceUrl: r.sourceUrl ?? null,
        timeMin: r.timeMin ?? null,
        haveCount,
        total: r.ingredients.length,
        missing,
        score: -missing.length + jaccard,
      };
    })
    .filter((c) => c.missing.length <= 3)
    .sort(
      (a, b) => b.score - a.score || (a.timeMin ?? 999) - (b.timeMin ?? 999)
    );
  return cands;
}

// Enhanced matching function for case-insensitive substring matching
function hasIngredient(
  userIngredients: Set<string>,
  recipeIngredient: string
): boolean {
  const normalizedRecipeIng = recipeIngredient.toLowerCase();

  // Check if any user ingredient is a substring of the recipe ingredient (or vice versa)
  for (const userIng of userIngredients) {
    const normalizedUserIng = userIng.toLowerCase();

    // Check both directions: user ingredient in recipe ingredient AND recipe ingredient in user ingredient
    if (
      normalizedRecipeIng.includes(normalizedUserIng) ||
      normalizedUserIng.includes(normalizedRecipeIng)
    ) {
      return true;
    }
  }

  return false;
}

export async function getSuggestions(maxMissing = 3) {
  const list = await ListRepo.all();
  const have = new Set(list.filter((i) => !i.checked).map((i) => i.nameNorm));

  const recipesRaw = await RecipeRepo.allWithIngredients();
  const recipes = recipesRaw.map((r) => ({
    id: r.id,
    title: r.title,
    imageUrl: r.imageUrl,
    sourceUrl: r.sourceUrl ?? undefined,
    timeMin: r.timeMin ?? undefined,
    ingredients: r.ingredients.map((ri) => ri.ingredient.nameNorm),
  }));

  const candidates = recipes
    .map((r) => {
      // Use enhanced matching for better ingredient detection
      const missing = r.ingredients.filter(
        (recipeIng) =>
          !hasIngredient(have, recipeIng) &&
          !hasIngredient(ASSUMED_PANTRY, recipeIng)
      );

      const haveCount = r.ingredients.length - missing.length;
      const totalUniqueIngredients = new Set([...r.ingredients, ...have]).size;
      const jaccard =
        totalUniqueIngredients > 0 ? haveCount / totalUniqueIngredients : 0;

      return {
        ...r,
        haveCount,
        total: r.ingredients.length,
        missing,
        score: -missing.length + jaccard,
      };
    })
    .filter((c) => c.missing.length <= maxMissing && c.total > 0) // Only include recipes with ingredients
    .sort(
      (a, b) => b.score - a.score || (a.timeMin ?? 999) - (b.timeMin ?? 999)
    );

  return { have: [...have], suggestions: candidates };
}
