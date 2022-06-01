export interface IStocksProvider {
    fetch(stock_name: string): Promise<{}>
}