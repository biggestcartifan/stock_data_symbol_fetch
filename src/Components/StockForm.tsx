import { useState } from "react"
import moment from "moment";
import styles from './stockform.module.css'
import StockNewsForm from "./StockNewsForm";
import {motion} from "framer-motion"

export default function StockForm({setLastRefresh, stockData, setStockData, symbolData, setSymbolData}) {
    const [search, setSearch] = useState("")
    const URL = "https://www.alphavantage.co/query"; 
    const API_KEY = import.meta.env.REACT_APP_API_KEY
    async function handleSubmit(e) {
        e.preventDefault()
        setSearch("")
        const res = await fetch(`${URL}?function=TIME_SERIES_INTRADAY&symbol=${search}&extended_hours=false&interval=5min&apikey=${API_KEY}`);
        const data = await res.json();

        const symbolDataInformation = data['Meta Data']
        const symbol = symbolDataInformation['2. Symbol'].toUpperCase()
        setSymbolData(symbol)

        const lastRefreshDataInformation = data['Meta Data']
        const lastRefresh = lastRefreshDataInformation['3. Last Refreshed']
        const lastRefreshFormattedData = moment(lastRefresh.split(' ')[0], 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')
        setLastRefresh(lastRefreshFormattedData)

        const timeSeries = data['Time Series (5min)']
        const formattedData = Object.keys(timeSeries).map(date =>({
            date: moment(date.split(' ')[1], "HH:mm:ss").format("hh:mm A"),
            open: parseFloat(timeSeries[date]['1. open']),
            high: parseFloat(timeSeries[date]['2. high']),
            low: parseFloat(timeSeries[date]['3. low']),
            close: parseFloat(timeSeries[date]['4. close']),
            volume: parseFloat(timeSeries[date]['5. volume'])
        })).reverse();
        setStockData(formattedData)
    }
    return (
        <div>
            <div className={styles.news}>
                <StockNewsForm/>
                <div className={styles.side}>
                    <div className={styles.container}>
                        <input className={styles.input} onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="search symbol..."/>
                        <button className={styles.search} onClick={(e)=>handleSubmit(e)}>search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
//npm install momment