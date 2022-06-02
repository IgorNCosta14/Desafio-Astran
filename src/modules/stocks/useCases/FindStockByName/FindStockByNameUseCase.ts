import { inject, injectable } from "tsyringe"
import { IStocksProvider } from "../../../../shared/container/SocksProvider/IStocksProvider"
import { IFindStockDTO } from "../../dtos/IStockDTO";

@injectable()
export class FindStockByNameUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute(stock_name: string): Promise<IFindStockDTO>{   
 
        const stock = await this.stocksProvider.fetchQuote(stock_name)

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString()
        }
        
        return stockData;

    }
}