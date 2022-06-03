import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";

export interface IGainsProjectionRequest {
    stock_name: string, 
    purchasedAmount: string, 
    purchasedAt: string,
}

interface IResponse {
    name: string,
    purchasedAmount: number,
    purchasedAt: string,
    priceAtDate: number,
    lastPrice: number
    capitalGains: number,
}

@injectable()
export class GainsProjectionUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}
    
    async execute({stock_name, purchasedAmount , purchasedAt}: IGainsProjectionRequest): Promise<IResponse> {
        const stockNow = await this.stocksProvider.fetchQuote(stock_name)
        const stockHistoric = await this.stocksProvider.fetchHistoric(stock_name)

        const priceArray = Object.entries(stockHistoric["Time Series (Daily)"])
        
        const filteredByData = priceArray.filter(([data]) => data == purchasedAt);

        console.log(stockNow)
        
        const stockHistoricData = {
            name: stockHistoric["Meta Data"]["2. Symbol"],
            purchasedAmount: parseFloat(purchasedAmount),
            purchasedAt: filteredByData[0][0],
            priceAtDate: parseFloat(filteredByData[0][1]["4. close"]),
            lastPrice: parseFloat(stockNow["Global Quote"]["05. price"]),
            capitalGains: parseFloat(((parseFloat(stockNow["Global Quote"]["05. price"]) - parseFloat(filteredByData[0][1]["4. close"]))*parseFloat(purchasedAmount)).toFixed(2)),
        }

        return stockHistoricData;
    }
}