# FoodieList — API v3 (Senior structure + tests + validation)

**Highlights**

- Controllers → Services → Repositories
- Zod schemas for bodies/queries
- Centralized error handling
- Jest unit tests (ts-jest)
- New route: `GET /api/recipes/search-live` (hits Spoonacular using your API key)
- Ingest route caches recipes: `POST /api/recipes/ingest?q=pasta&n=20`
- Suggestions: `GET /api/recipes/suggest?maxMissing=3`

## Quick start
```
cd foodielist-api
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```
Seed mock recipes:
```
npm run seed:mock
```
Run tests:
```
npm test
```

> Your Spoonacular key is referenced via `.env` (`SPOONACULAR_API_KEY`). Rotate if needed.
