import styles from './stockinformation.module.css'
export default function StockInformation({stockData, lastRefresh}) {
    const highestPriceClose = stockData.length > 0 ? Math.max(...stockData.map(data=>data.close)) : null
    const dateToMaxClose = stockData.find(data=> data.close === highestPriceClose)

    const lowestPriceClose = stockData.length > 0 ? Math.min(...stockData.map(data=>data.close)) : null
    const dateToMinClose = stockData.find(data=> data.close === lowestPriceClose)
    return (
        <div >
            <div className={styles.container}> 
                    {lastRefresh && highestPriceClose && lowestPriceClose !== null ? (
                        <p className={styles.info}>
                            <span className={styles.date}>{lastRefresh}</span>
                            <span className={styles.highestPriceClose}>High: {`${highestPriceClose.toFixed(2)} @ ${dateToMaxClose.date}`}</span>
                            <span className={styles.highestPriceClose}>Min: {`${lowestPriceClose.toFixed(2)} @ ${dateToMinClose.date}`}</span>
                        </p>
                    ) : (
                        <div>
                            
                        </div>
                    )}
            </div>
            <div>
            </div>
        </div>
    )
}