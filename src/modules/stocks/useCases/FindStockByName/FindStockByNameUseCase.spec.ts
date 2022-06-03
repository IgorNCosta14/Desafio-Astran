import { strict } from "assert";
import { StocksProvider } from "../../../../shared/container/StocksProvider/implementations/StocksProvider";
import { FindStockByNameUseCase } from "./FindStockByNameUseCase"

let stocksProvider: StocksProvider;
let findStockByNameUseCase: FindStockByNameUseCase;


describe("Find stock by name", () => {
    beforeEach(() => {
        stocksProvider = new StocksProvider();
        findStockByNameUseCase = new FindStockByNameUseCase(stocksProvider);
    })

    it("should be able to get data of the stock", async () => {
        const stock = await findStockByNameUseCase.execute("IBM")

        expect(stock).toHaveProperty("name")
        expect(stock.name).toBe("IBM")
        expect(stock).toHaveProperty("pricedAt")
        expect(typeof stock.pricedAt).toBe("string")
        expect(stock).toHaveProperty("lastPrice")
        expect(typeof stock.lastPrice).toBe("number")
    })
}) 