import styles from "./Gains.module.css"

interface gains {
    name: string;
    purchasedAmount: number;
    purchasedAt: string;
    priceAtDate: number;
    lastPrice: number;
    capitalGains: number;
  }

export function Gains({name, purchasedAmount, purchasedAt, priceAtDate,
lastPrice, capitalGains}:gains) {
    return (
        <div className={styles.gains}>
            <span><strong>Ação: </strong>{name}</span>
            <span><strong>Quantidade comprada: </strong>{purchasedAmount}</span>
            <span><strong>Data da compra: </strong><span>{purchasedAt}</span></span>
            <span><strong>Preço da ação na data da compra: </strong><span>{priceAtDate}</span></span>
            <span><strong>Preço atual da ação: </strong><span>{lastPrice}</span></span>
            <span><strong>Balanço: </strong><span>{capitalGains}</span></span>
        </div>
    )
}