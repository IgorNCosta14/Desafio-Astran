import { inject, injectable } from "tsyringe"
import { IStocksProvider } from "../../../shared/container/SocksProvider/IStocksProvider"

@injectable()
export class FindStockByNameUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute(stock_name: string) {   

        return this.stocksProvider.fetch(stock_name)

    }
}