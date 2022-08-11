import styles from "./Historic.module.css";
import {v4 as uuidV4 } from "uuid";

interface Pricing {
    opening: number;
    low: number;
    high: number;
    closing: number;
    pricedAt: string;
}

interface Historic{
    historic: Pricing[];
}

export function Historic(historic: Historic) {
    return (
        <div className={styles.historic}>
            <table>
                <tbody>
                    <tr>
                        <th>Abertura</th>
                        <th>Baixo</th>
                        <th>Alto</th>
                        <th>Fechamento</th>
                        <th>Data</th>
                    </tr>
                        
                    {historic.historic.map((quote) => {
                        return (
                            <tr key={uuidV4()}>
                                <td>{quote.opening}</td>
                                <td>{quote.low}</td>
                                <td>{quote.high}</td>
                                <td>{quote.closing}</td>
                                <td>{quote.pricedAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}