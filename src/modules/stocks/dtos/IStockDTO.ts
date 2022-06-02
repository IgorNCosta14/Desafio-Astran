export interface IFindStockDTO { 
    name: string;
    lastPrice: number;
    pricedAt: string;
}

export interface IGetHistoricDTO { 
    stock_name: string, 
    from: string, 
    to: string,
}