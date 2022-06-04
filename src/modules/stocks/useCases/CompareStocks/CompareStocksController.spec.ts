import { app } from "../../../../shared/http/app";
import request from "supertest";

jest.useRealTimers();

describe("Compare stocks", () => {
    it("Should be able to compare stocks", async () => {
        const response = await request(app).get("/stocks/IBM/compare").send({stocks: ["PETR4.SA", "VALE5.SA"]});

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("lastPrices");
        expect(response.body.lastPrices.length).toBe(3);
        expect(response.body.lastPrices[0]).toHaveProperty("name");
        expect(response.body.lastPrices[0].name).toBe("IBM");
        expect(response.body.lastPrices[0]).toHaveProperty("lastPrice");
        expect(response.body.lastPrices[0]).toHaveProperty("pricedAt");
        expect(response.body.lastPrices[1].name).toBe("PETR4.SA");
        expect(response.body.lastPrices[2].name).toBe("VALE5.SA");

    }, 20000)
})