import { Router } from "express";
import { CompareStocksController } from "../../../modules/stocks/useCases/CompareStocks/CompareStocksController";
import { FindStockByNameController } from "../../../modules/stocks/useCases/FindStockByName/FindStockByNameController";
import { GetStockHistoricController } from "../../../modules/stocks/useCases/GetStockHistoric/GetStockHistoricController";

const stocksRoutes = Router();

const findStockByNameController = new FindStockByNameController();
const getStockHistoricController = new GetStockHistoricController();
const compareStocksController = new CompareStocksController();

stocksRoutes.get("/:stock_name/quote", findStockByNameController.handle);
stocksRoutes.get("/:stock_name/history", getStockHistoricController.handle);
stocksRoutes.get("/:stock_name/compare", compareStocksController.handle);

export { stocksRoutes };
