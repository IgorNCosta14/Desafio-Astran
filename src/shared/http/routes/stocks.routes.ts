import { Router } from "express";
import { FindStockByNameController } from "../../../modules/stocks/useCases/FindStockByName/FindStockByNameController";
import { GetStockHistoricController } from "../../../modules/stocks/useCases/GetStockHistoric/GetStockHistoricController";

const stocksRoutes = Router();

const findStockByNameController = new FindStockByNameController()
const getStockHistoricController = new GetStockHistoricController()

stocksRoutes.get("/:stock_name/quote", findStockByNameController.handle);
stocksRoutes.get("/:stock_name/history", getStockHistoricController.handle)

export { stocksRoutes };
