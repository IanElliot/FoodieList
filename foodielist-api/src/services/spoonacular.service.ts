import axios from 'axios';
import { config } from '@/config/env';

export type SpoonRecipe = {
  id: number;
  title: string;
  image?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  readyInMinutes?: number;
  extendedIngredients?: Array<{ name?: string; nameClean?: string; originalName?: string; amount?: number; unit?: string }>;
};

export async function spoonacularSearch(query: string, number = 10) {
  if (!config.spoonacularKey) throw new Error('Missing SPOONACULAR_API_KEY');
  const { data } = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
    params: { apiKey: config.spoonacularKey, query, number, addRecipeInformation: true }
  });
  return (data.results ?? []) as SpoonRecipe[];
}
