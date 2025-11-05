import { Router } from "express";
import { PromptAI } from "./ai.services";

export const AI_ROUTE = "/ai";
export const AIRouter = Router();

AIRouter.post(AI_ROUTE, PromptAI);
