import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IMultipleQuotesDTO } from "../../dtos/IStockDTO"

interface ILastPrices {
    name: string,
    lastPrice: number,
    pricedAt: string,
}

interface ILastPricesResponse {
    lastPrices: ILastPrices[]
}

@injectable()
export class CompareStocksUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, stocks}: IMultipleQuotesDTO): Promise<ILastPricesResponse> {
        const lastPricesResponse: ILastPricesResponse = {
            lastPrices: []
        };

        const stock = await this.stocksProvider.fetchQuote(stock_name)

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString()
        }

        lastPricesResponse.lastPrices.push(stockData)

        for (const value of stocks) {

            const stock = await this.stocksProvider.fetchQuote(value)

            if(stocks.length === 0) {
                throw new AppError("stocks não pode estar vazio")
            }

            const pricing = {
                name: stock["Global Quote"]["01. symbol"],
                lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
                pricedAt: (new Date()).toISOString()
            }
            lastPricesResponse.lastPrices.push(pricing)
        }
        
        return lastPricesResponse;
    }
}