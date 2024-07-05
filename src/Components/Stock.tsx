import StockForm from "./StockForm"
import { useState } from "react"
import StockChart from "./StockChart"
import Header from "./Header"
import StockInformation from "./StockInformation"
import styles from './stock.module.css'
export default function Stock() {
    const [stockData, setStockData] = useState([])
    const [symbolData, setSymbolData] = useState([])
    const [lastRefresh, setLastRefresh] = useState([])
    return (
        <div className={styles.container}>
            <div>
                <Header symbolData={symbolData}/>
            </div>
            <div>
                <StockChart stockData={stockData}/>
            </div>
            <div className={styles.information}>
                <StockInformation stockData={stockData} lastRefresh={lastRefresh}/>
            <div>
                <StockForm setLastRefresh={setLastRefresh} stockData={stockData} setStockData={setStockData} symbolData={symbolData} setSymbolData={setSymbolData}/>
            </div>
            </div>
        </div>
    )
}