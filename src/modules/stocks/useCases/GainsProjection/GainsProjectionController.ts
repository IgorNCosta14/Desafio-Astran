import { Request, Response } from "express";
import { container } from "tsyringe";
import { GainsProjectionUseCase } from "./GainsProjectionUseCase";

export class GainsProjectionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { stock_name } = request.params;
        const { purchasedAmount , purchasedAt } = request.query;

        const gainsProjectionUseCase = container.resolve(GainsProjectionUseCase);

        const gainsProjection = await gainsProjectionUseCase.execute({ stock_name, purchasedAmount: purchasedAmount as string, purchasedAt: purchasedAt as string });

        return response.status(201).json(gainsProjection);
    }
}