import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/SocksProvider/IStocksProvider";
import { IGetHistoricDTO } from "../../dtos/IStockDTO";

@injectable()
export class GetStockHistoricUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, from, to}: IGetHistoricDTO) {
        const stockHistoric = this.stocksProvider.fetchHistoric({stock_name, from, to})

        return stockHistoric;
    }
}