import styles from "./Comparison.module.css";
import {v4 as uuidV4 } from "uuid";

interface LastPrices {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

interface Comparison{
    comparison: LastPrices[]
}

export function Comparison(comparison: Comparison) {

    return (
        <div className={styles.comparison}>
            <table>
                <tbody>
                    <tr>
                        <th>Ação</th>
                        <th>Última cotação</th>
                        <th>Data da cotação</th>
                    </tr>
                        
                    {comparison.comparison.map((quote) => {
                        return (
                            <tr key={uuidV4()}>
                                <td>{quote.name}</td>
                                <td>{quote.lastPrice}</td>
                                <td>{quote.pricedAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}