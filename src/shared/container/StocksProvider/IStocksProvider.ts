import { IFindStockResponseDTO, IMultipleQuotesDTO, IStockHistoricResponseDTO } from "../../../modules/stocks/dtos/IStockDTO";

export interface IResponse {
    'Meta Data': {}
    'Time Series (Daily)': {}
}

export interface IMultipleQuotesResponse {
    lastPrices: []
}

export interface IStocksProvider {
    fetchQuote(stock_name: string): Promise<IFindStockResponseDTO>,
    fetchHistoric(stock_name: string): Promise<IStockHistoricResponseDTO>,
}