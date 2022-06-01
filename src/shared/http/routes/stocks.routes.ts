import { Router } from "express";
import { FindStockByNameController } from "../../../modules/stocks/useCases/FindStockByNameController";

const stocksRoutes = Router();

const findStockByNameController = new FindStockByNameController()

stocksRoutes.get("/:stock_name/quote", findStockByNameController.handle);

export { stocksRoutes };
