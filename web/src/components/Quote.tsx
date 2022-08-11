import styles from "./Quote.module.css"

interface quote {
    name: string;
    lastPrice: number;
    pricedAt: string;
}

export function Quote({name, lastPrice, pricedAt}: quote) {
    return(
        <div className={styles.quote}>
            <span><strong>Ação: </strong>{name}</span>
            <span><strong>Última cotação: </strong>{lastPrice}</span>
            <span><strong>Data da cotação: </strong><span>{pricedAt}</span></span>
        </div>
    )
}