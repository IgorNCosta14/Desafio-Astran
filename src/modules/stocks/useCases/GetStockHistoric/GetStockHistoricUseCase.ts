import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/SocksProvider/IStocksProvider";
import { IGetHistoricDTO } from "../../dtos/IStockDTO";

interface Pricing {
    opening: string,
    low: string,
    high: string,
    closing: string,
    pricedAt: string
}

@injectable()
export class GetStockHistoricUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, from, to}: IGetHistoricDTO) {
        const stockHistoric = await this.stocksProvider.fetchHistoric(stock_name)

        console.log(stockHistoric)

        const stockHistoricData = {
            name: stockHistoric["Meta Data"]["2. Symbol"],
            prices: []
        }

        const priceArray = Object.entries(stockHistoric["Time Series (Daily)"])
        
        const filteredByData = priceArray.filter(([data]) => data >= from && data <= to);

        for (const value of filteredByData) {

            const pricing: Pricing = {
                opening: value[1]['1. open'],
                low: value[1]['3. low'],
                high: value[1]['2. high'],
                closing: value[1]['4. close'],
                pricedAt: value[0]
            }
            stockHistoricData.prices.push(pricing)
        }

        return stockHistoricData;

    }
}