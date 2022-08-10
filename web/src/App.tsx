import './global.css'
import { Header } from './components/Header'
import { GetQuote } from './components/GetQuote'
import { GetGains } from './components/GetGains'
import styles from './App.module.css'
import { GetHistoric } from './components/GetHistoric'
import { GetComparison } from './components/GetComparison'

function App() {
  return (
    <div className={styles.resSize}>
      <Header />
      <div className={styles.appBodyRes}>
        <div className={styles.appBody}>
          <div className={styles.wrapper}>
            <GetQuote />
            <GetGains />
          </div>
          <div><GetHistoric /></div>
          <div><GetComparison /></div>
        </div>
      </div>
    </div>
  )
}

export default App
