import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios";
import styles from "./GetQuote.module.css"
import { Quote } from "./Quote";
import { ArchiveBox, ArrowCounterClockwise } from "phosphor-react";
import { Tooltip } from "@mui/material";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'

interface quote {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

export function GetQuote() {
    const [quoteName, setQuoteName] = useState('')
    const [quoteDate, setQuoteDate] = useState('')
    const [quote, setQuote] = useState<quote>()

    function handleNewQuote(event: ChangeEvent<HTMLTextAreaElement>) {
        setQuoteName(event.target.value);
    }

    async function handleGetQuote(event: FormEvent) {
        event.preventDefault();

        const stockResponse = await axios
        .get(`http://localhost:3333/stocks/${quoteName}/quote`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

        console.log(stockResponse.pricedAt)

        setQuoteDate(format(Date.parse(stockResponse.pricedAt), "d'/'LL'/'y '-' HH:mm:ss", {
            locale: ptBR,
        }))

        return setQuote(stockResponse);  
    }

    function handleCleanGetQuote() {
        setQuote(undefined);
        setQuoteName('');
    }

    

    function handleAddToPortfolio() {
        console.log("OI")
    }

    const quoteEmpty = !quote

    return (
        <div className={styles.getQuoteBox}>
            <div className={styles.getQuote}>
                <form className={styles.getQuoteForm}>
                    <strong>
                        Buscar cotação de ação
                    </strong>

                    {quoteEmpty ? 
                            <div className={styles.getQuoteFormWrapper}>
                                <textarea
                                    value={quoteName}
                                    onChange={handleNewQuote}
                                    placeholder="Digite o nome da ação"
                                    maxLength={134}
                                    required 
                                />
                                <button onClick={handleGetQuote}>
                                    Buscar
                                </button>
                            </div>

                        :
                        
                        <div className={styles.getQuoteReturn}>
                            <Quote 
                            name={quote.name}
                            lastPrice={quote.lastPrice}
                            pricedAt={quoteDate}
                            />

                            <div className={styles.getQuoteReturnButtons}>
                                <Tooltip title="Adicionar ao portfólio">
                                    <button onClick={handleAddToPortfolio}>
                                        <ArchiveBox />
                                    </button>
                                </Tooltip>
                                
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