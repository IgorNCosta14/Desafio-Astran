import { Request, Response } from "express"
import { container } from "tsyringe";
import { FindStockByNameUseCase } from "./FindStockByNameUseCase";

class FindStockByNameController {
    async handle(request: Request, response: Response) {
        const { stock_name } = request.params;

        const findStockByNameUseCase = container.resolve(FindStockByNameUseCase);

        const stockData = await findStockByNameUseCase.execute(stock_name);

        return response.status(201).json(stockData)
    }
}

export { FindStockByNameController }