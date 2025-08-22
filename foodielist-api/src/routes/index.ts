import { Router } from "express";
import { recipesRouter } from "./recipes.routes";
import { listRouter } from "./list.routes";
import { savedRouter } from "./saved.routes";

export const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

router.use("/recipes", recipesRouter);
router.use("/list-items", listRouter);
router.use("/saved-recipes", savedRouter);
