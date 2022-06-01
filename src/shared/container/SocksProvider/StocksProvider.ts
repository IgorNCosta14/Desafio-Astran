import { IFindStockDTO } from "../../../modules/stocks/dtos/IFindStockDTO";
import { IStocksProvider } from "./IStocksProvider"
const alpha = require('alphavantage')({ key: 'MDMEJX46EYP052S5' })

class StocksProvider implements IStocksProvider {

    public async fetch(stock_name: string): Promise<IFindStockDTO> {
        const stock = await alpha.data.quote(stock_name);

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString() 
        }
        
        return stockData;
    }
}

export { StocksProvider }