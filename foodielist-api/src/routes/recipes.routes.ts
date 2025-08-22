import { Router } from "express";
import { RecipesController } from "@/controllers/recipes.controller";
import { seedMock } from "@/services/recipes.service";

export const recipesRouter = Router();

recipesRouter.get("/search-live", RecipesController.searchLive);
recipesRouter.post("/ingest", RecipesController.ingest);
recipesRouter.get("/suggest", RecipesController.suggest);
recipesRouter.post("/seed-mock", async (req, res) => {
  await seedMock();
  res.json({ ok: true, message: "Mock recipes seeded" });
});
