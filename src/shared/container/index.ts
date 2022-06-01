import { container } from "tsyringe";
import { IStocksProvider } from "./SocksProvider/IStocksProvider";
import { StocksProvider } from "./SocksProvider/StocksProvider";

container.register<IStocksProvider>("StocksProvider",StocksProvider)