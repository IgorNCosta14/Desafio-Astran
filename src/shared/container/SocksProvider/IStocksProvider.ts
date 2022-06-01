import { IFindStockDTO } from "../../../modules/stocks/dtos/IFindStockDTO";

export interface IStocksProvider {
    fetch(stock_name: string): Promise<IFindStockDTO>
}