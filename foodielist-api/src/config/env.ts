import 'dotenv/config';
export const config = { port: Number(process.env.PORT ?? 3001), spoonacularKey: process.env.SPOONACULAR_API_KEY ?? '' };
