import { inject, injectable } from "tsyringe"
import { IStocksProvider } from "../../../shared/container/SocksProvider/IStocksProvider"
import { IFindStockDTO } from "../dtos/IFindStockDTO";

@injectable()
export class FindStockByNameUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute(stock_name: string): Promise<IFindStockDTO>{   
 
        const stocksData = await this.stocksProvider.fetch(stock_name)

        return stocksData;
    }
}