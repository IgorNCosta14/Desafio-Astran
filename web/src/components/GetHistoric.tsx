import { Tooltip } from "@mui/material";
import axios from "axios";
import { ArrowCounterClockwise } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react"
import styles from "./GetHistoric.module.css"
import { Historic } from "./Historic";

interface Historic {
    name: string;
    prices: Pricing[];
}

interface Pricing {
    opening: number;
    low: number;
    high: number;
    closing: number;
    pricedAt: string;
}
export function GetHistoric() {
    const [stockName, setStockName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [historic, setHistoric] = useState<Historic>();

    function handleGetStockName(event: ChangeEvent<HTMLTextAreaElement>) {
        setStockName(event.target.value);
    }

    function handleGetFrom(event: ChangeEvent<HTMLTextAreaElement>) {
        setFrom(event.target.value);
    }

    function handleGetTo(event: ChangeEvent<HTMLTextAreaElement>) {
        setTo(event.target.value);
    }

    async function handleHistoric(event: FormEvent) {
        event.preventDefault();

        const stockResponse = await axios
            .get(
                `http://localhost:3333/stocks/${stockName}/history?from=${from}&to=${to}`
            )
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });

        return setHistoric(stockResponse);
    }

    function handleCleanGetHistoric() {
        setHistoric(undefined);
        setStockName('');
        setFrom('');
        setTo('')

    }


    const historicEmpty = !historic

    return (
        <div className={styles.getHistoricBox}>
            <div className={styles.getHistoric}>
                <form className={styles.getHistoricForm}>
                    <strong>Buscar historico de ação</strong>

                    {historicEmpty ? 
                        
                        <div className={styles.getHistoricFormWrapper}>
                            <div className={styles.getHistoricFormWrapperTextarea}>
                                <textarea
                                    value={stockName}
                                    onChange={handleGetStockName}
                                    placeholder="Digite o nome da ação"
                                    maxLength={134}
                                    required 
                                />
                                <div className={styles.getHistoricFormWrapperDate}>
                                    <textarea
                                        value={from}
                                        onChange={handleGetFrom}
                                        placeholder="Data de início da pesquisa"
                                        maxLength={134}
                                        required 
                                    />
                                    <textarea
                                        value={to}
                                        onChange={handleGetTo}
                                        placeholder="Data de final da pesquisa"
                                        maxLength={134}
                                        required 
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleHistoric}
                            >
                                Buscar
                            </button>
                        </div>

                        :    

                        <div className={styles.getHistoricReturn}>
                            <Historic 
                                historic={historic.prices}
                            />

                            <div className={styles.getHistoricReturnButtons}>                                    
                                <Tooltip title="Voltar">
                                    <button onClick={handleCleanGetHistoric}>
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