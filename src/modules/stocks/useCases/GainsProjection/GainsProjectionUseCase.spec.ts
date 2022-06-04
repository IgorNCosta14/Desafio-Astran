import { StocksProvider } from "../../../../shared/container/StocksProvider/implementations/StocksProvider";
import { TestStockProvider } from "../../../../shared/container/StocksProvider/implementations/TestStockProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { GainsProjectionUseCase } from "./GainsProjectionUseCase";


let stocksProvider: StocksProvider;
let testStockProvider: TestStockProvider;
let gainsProjectionUseCase: GainsProjectionUseCase;


describe("Get stock gains projection", () => {
    beforeEach(() => {
        stocksProvider = new StocksProvider();
        testStockProvider = new TestStockProvider()
        gainsProjectionUseCase = new GainsProjectionUseCase(testStockProvider);
    })

    it("Should be able to project the gains of a stock", async () => {
        const projection = await gainsProjectionUseCase.execute({stock_name: "IBM", purchasedAmount: "100", purchasedAt: "2019-01-03"})
        
        expect(projection).toHaveProperty("name");
        expect(projection.name).toBe("IBM");
        expect(typeof projection.name).toBe("string");
        expect(projection).toHaveProperty("purchasedAmount");
        expect(typeof projection.purchasedAmount).toBe("number");
        expect(projection).toHaveProperty("purchasedAt");
        expect(projection.purchasedAt).toBe("2019-01-03");
        expect(typeof projection.purchasedAt).toBe("string");
        expect(projection).toHaveProperty("priceAtDate");
        expect(typeof projection.priceAtDate).toBe("number");
        expect(projection).toHaveProperty("lastPrice");
        expect(typeof projection.lastPrice).toBe("number");
        expect(projection).toHaveProperty("capitalGains");
        expect(typeof projection.capitalGains).toBe("number");
    })

    it("Should not be able to get data if the stock name is invalid", async () => {
        await expect(gainsProjectionUseCase.execute({stock_name: "testError", purchasedAmount: "100", purchasedAt: "2019-01-03"})).rejects.toEqual(new AppError("Stock not found!", 404));
    })

    it("Should not be able to get data if the purchase date was not found", async () => {
        await expect(gainsProjectionUseCase.execute({stock_name: "IBM", purchasedAmount: "100", purchasedAt: "2019-01-04"})).rejects.toEqual(new AppError("Date not found!", 404));
    })

}) 