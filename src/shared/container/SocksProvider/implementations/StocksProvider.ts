import { IFindStockDTO, IGetHistoricDTO } from "../../../../modules/stocks/dtos/IStockDTO";
import { IResponse, IStocksProvider } from "../IStocksProvider"
const alpha = require('alphavantage')({ key: 'MDMEJX46EYP052S5' })

class StocksProvider implements IStocksProvider {
    

    public async fetchQuote(stock_name: string): Promise<IFindStockDTO> {
        const stock = await alpha.data.quote(stock_name);

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString()
        }
        
        return stockData;
    }

    public async fetchHistoric({stock_name, from, to}: IGetHistoricDTO): Promise<IResponse> {
        const stockHistoric = await alpha.data.daily(stock_name)

        const stockHistoricData = {
            name: stockHistoric["Meta Data"]["2. Symbol"],
            prices: []
        }

        const priceArray = Object.entries(stockHistoric["Time Series (Daily)"])

        
        const filteredByData = priceArray.filter(([data]) => data >= from && data <= to);

        for (const valor of filteredByData) {

            const pricing = {
                opening: valor[1]['1. open'],
                low: valor[1]['3. low'],
                high: valor[1]['2. high'],
                closing: valor[1]['4. close'],
                pricedAt: valor[0]
            }
            stockHistoricData.prices.push(pricing)
        }

        return stockHistoricData;
    }
}

export { StocksProvider }