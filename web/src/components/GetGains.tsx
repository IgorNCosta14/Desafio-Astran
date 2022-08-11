import { ChangeEvent, SyntheticEvent, useState } from "react"
import axios from "axios";
import styles from "./GetGains.module.css"
import { Gains } from "./Gains";
import { Tooltip } from "@mui/material";
import { ArrowCounterClockwise } from "phosphor-react";

interface quoteReturn {
    name: string;
    purchasedAmount: number;
    purchasedAt: string;
    priceAtDate: number;
    lastPrice: number;
    capitalGains: number;
}

export function GetGains() {
    const [quoteStockName, setQuoteStockName] = useState('')
    const [quoteInfoPurchasedAmount, setQuotePurchasedAmount] = useState('')
    const [quotePurchasedAt, setQuotePurchasedAt] = useState('')
    const [quoteDate, setQuoteDate] = useState('')
    const [quoteGains, setQuoteGains] = useState<quoteReturn>()

    function handleGetQuoteStockName(event: ChangeEvent<HTMLTextAreaElement>) {
        setQuoteStockName(event.target.value);
    }

    function handleGetQuotePurchasedAmount(event: ChangeEvent<HTMLTextAreaElement>) {
        setQuotePurchasedAmount(event.target.value);
    }

    function handleGetQuotePurchasedAt(event: ChangeEvent<HTMLTextAreaElement>) {
        setQuotePurchasedAt(event.target.value);
    }

    async function handleGetQuoteInfo(event: SyntheticEvent) {
        event.preventDefault();
        const stockGainsResponse = await axios
          .get(
            `http://localhost:3333/stocks/${quoteStockName}/gains?purchasedAmount=${quoteInfoPurchasedAmount}&purchasedAt=${quotePurchasedAt}`
          )
          .then((response) => response.data)
          .catch((error) => {
            throw error;
          });

        return setQuoteGains(stockGainsResponse);
    }

    function handleCleanGetQuote() {
        setQuoteGains(undefined);
        setQuoteStockName('');
        setQuotePurchasedAmount('');
        setQuotePurchasedAt('');
    }

    const quoteGainsEmpty = !quoteGains

    return (
        <div className={styles.getGainsBox}>
            <div className={styles.getGains}>
                <form className={styles.getGainsForm}>
                    <strong>
                        Projetar ganhos da ação
                    </strong>

                    {quoteGainsEmpty ? 
                            <div className={styles.getGainsFormWrapper}>
                                <textarea 
                                    placeholder="Digite o nome da Ação"
                                    value={quoteStockName}
                                    onChange={handleGetQuoteStockName}
                                    maxLength={134}
                                    required 
                                />
                                <textarea 
                                    placeholder="Digite a quantidade comprada"
                                    value={quoteInfoPurchasedAmount}
                                    onChange={handleGetQuotePurchasedAmount}
                                    maxLength={134}
                                    required 
                                />
                                <textarea 
                                    placeholder="Digite a data da compra"
                                    value={quotePurchasedAt}
                                    onChange={handleGetQuotePurchasedAt}
                                    maxLength={134}
                                    required 
                                />
                                <button onClick={handleGetQuoteInfo}>Buscar</button>
                            </div>
                        :

                            <div className={styles.getGainsReturn}>
                                <Gains 
                                    name={quoteGains.name}
                                    purchasedAmount={quoteGains.purchasedAmount}
                                    purchasedAt={quoteGains.purchasedAt}
                                    priceAtDate={quoteGains.priceAtDate}
                                    lastPrice={quoteGains.lastPrice}
                                    capitalGains={quoteGains.capitalGains}
                                />

                                <div className={styles.getGainsReturnButtons}>                                    
                                    <Tooltip title="Voltar">
                                        <button onClick={handleCleanGetQuote}>
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