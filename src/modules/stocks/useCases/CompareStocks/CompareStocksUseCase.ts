import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IMultipleQuotesDTO } from "../../dtos/IStockDTO"

@injectable()
export class CompareStocksUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, stocks}: IMultipleQuotesDTO): Promise<{}[]> {
        if(stocks.length === 0) {
            throw new AppError('error2')
        }

        const lastPrices = [] ;

        const stock = await this.stocksProvider.fetchQuote(stock_name)

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString()
        }

        lastPrices.push(stockData)

        for (const value of stocks) {

            const stock = await this.stocksProvider.fetchQuote(value)

            const pricing = {
                name: stock["Global Quote"]["01. symbol"],
                lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
                pricedAt: (new Date()).toISOString()
            }
            lastPrices.push(pricing)
        }
        
        return lastPrices
    }
}