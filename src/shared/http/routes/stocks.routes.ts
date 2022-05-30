import { Router } from "express";

const stocksRoutes = Router();

stocksRoutes.get("/:stock_name/quote", () => console.log("hello world"));

export { stocksRoutes };
