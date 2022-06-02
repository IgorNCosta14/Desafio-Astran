import { container } from "tsyringe";
import { IStocksProvider } from "./SocksProvider/IStocksProvider";
import { StocksProvider } from "./SocksProvider/implementations/StocksProvider";

container.register<IStocksProvider>("StocksProvider",StocksProvider)