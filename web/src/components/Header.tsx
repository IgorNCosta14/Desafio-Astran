import styles from "./Header.module.css"

export function Header() {
    return (
        <header className={styles.header}>
            <button className={styles.avatar}>
                <img src="https://github.com/IgorNCosta14.png"/>
            </button >
            
            <button className={styles.exit}>Sair</button>
        </header>
    )
}