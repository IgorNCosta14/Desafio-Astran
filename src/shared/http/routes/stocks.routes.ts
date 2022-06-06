import { Router } from "express";
import { CompareStocksController } from "../../../modules/stocks/useCases/CompareStocks/CompareStocksController";
import { FindStockByNameController } from "../../../modules/stocks/useCases/FindStockByName/FindStockByNameController";
import { GainsProjectionController } from "../../../modules/stocks/useCases/GainsProjection/GainsProjectionController";
import { GetStockHistoricController } from "../../../modules/stocks/useCases/GetStockHistoric/GetStockHistoricController";

const stocksRoutes = Router();

const findStockByNameController = new FindStockByNameController();
const getStockHistoricController = new GetStockHistoricController();
const compareStocksController = new CompareStocksController();
const gainsProjectionController = new GainsProjectionController();

stocksRoutes.get("/:stock_name/quote", findStockByNameController.handle);
stocksRoutes.get("/:stock_name/history", getStockHistoricController.handle);
stocksRoutes.post("/:stock_name/compare", compareStocksController.handle);
stocksRoutes.get("/:stock_name/gains", gainsProjectionController.handle);

export { stocksRoutes };
