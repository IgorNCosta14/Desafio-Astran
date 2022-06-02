import { IFindStockDTO, IGetHistoricDTO } from "../../../modules/stocks/dtos/IStockDTO";

export interface IResponse {
    name: string,
    prices: []
}

export interface IStocksProvider {
    fetchQuote(stock_name: string): Promise<IFindStockDTO>,
    fetchHistoric({stock_name, from, to}: IGetHistoricDTO): Promise<IResponse>
}