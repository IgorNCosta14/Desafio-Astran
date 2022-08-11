import { Tooltip } from "@mui/material";
import axios from "axios";
import { ArrowCounterClockwise } from "phosphor-react";
import { ChangeEvent, SyntheticEvent, useState } from "react"
import { Comparison } from "./Comparison";
import styles from "./GetComparison.module.css"

interface LastPrices {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

interface IComparison{
    lastPrices: LastPrices[]
}

export function GetComparison() {
    const [stockName, setStockName] = useState("");
    const [stocks, setStocks] = useState("")
    const [comparison, setComparison] = useState<IComparison>();

    const regex = /\w+/g

    function handleGetStockName(event: ChangeEvent<HTMLTextAreaElement>) {
        setStockName(event.target.value);
    }

    function handleGetStocks(event: ChangeEvent<HTMLTextAreaElement>) {
        setStocks(event.target.value);
    }

    async function handleGetComparison(event: SyntheticEvent) {
        const stocksArray = stocks.match(regex)

        event.preventDefault();

        const stockResponse = await axios
        .post(`http://localhost:3333/stocks/${stockName}/compare`, {
            stocks: stocksArray,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
        });

        return setComparison(stockResponse);
    }

    function handleCleanComparison() {
        setComparison(undefined)
    }

    const comparisonEmpty = !comparison//.length === 0

    return (
        <div>
            <div className={styles.getComparison}>
                <form className={styles.getComparisonForm}>
                    <strong>
                        Comparar ações
                    </strong>

                    { comparisonEmpty ?
                        <div className={styles.getComparisonFormWrapper}>
                            <div className={styles.getComparisonFormWrapperTextArea}>
                                <textarea 
                                    className={styles.textAreaStockName}
                                    placeholder="Digite a ação desejada"
                                    value={stockName}
                                    onChange={handleGetStockName}
                                    maxLength={134}
                                    required 
                                />
                                <textarea 
                                    className={styles.textAreaGetStocks}
                                    placeholder="Digite as ações para comparação"
                                    value={stocks}
                                    onChange={handleGetStocks}
                                    maxLength={134}
                                    required 
                                />
                            </div>
                            <button onClick={handleGetComparison}>Buscar</button>
                        </div>

                        :
                        
                        <div>
                            <Comparison 
                                comparison={comparison.lastPrices}
                            />

                            <div className={styles.getComparisonReturnButtons}>                                    
                                <Tooltip title="Voltar">
                                    <button onClick={handleCleanComparison}>
                                        <ArrowCounterClockwise />
                                    </button>
                                </Tooltip>

                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}