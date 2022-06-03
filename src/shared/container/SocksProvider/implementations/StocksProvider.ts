import { IFindStockResponseDTO, IMultipleQuotesDTO, IStockHistoricResponseDTO } from "../../../../modules/stocks/dtos/IStockDTO";
import { IMultipleQuotesResponse, IStocksProvider } from "../IStocksProvider";

const alpha = require('alphavantage')({ key: 'MDMEJX46EYP052S5' })

class StocksProvider implements IStocksProvider {
    public async fetchQuote(stock_name: string): Promise<IFindStockResponseDTO> {
        const stock = await alpha.data.quote(stock_name);

        return stock;
    }

    public async fetchHistoric(stock_name: string): Promise<IStockHistoricResponseDTO> {
        const stockHistoric = await alpha.data.daily(stock_name, "full")

        return stockHistoric;
    }
}

export { StocksProvider }