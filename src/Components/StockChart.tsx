import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, CartesianGrid, Tooltip } from "recharts"
import styles from './stockchart.module.css'
export default function StockChart({stockData}) {
    const highestPriceClose = Math.max(...stockData.map(data=>data.close));
    const lowestPriceClose = Math.min(...stockData.map(data=>data.close));
    return (
        <ResponsiveContainer>
            <div className={styles.chartContainer}>
                <LineChart width={1500} height={600} data={stockData}>
                    <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} activeDot={{ r: 8, stroke: '#82ca9d', strokeWidth: 2 }}/>
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} orientation="right"/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Tooltip/>
                    <ReferenceLine y={highestPriceClose} label="highest close" stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={lowestPriceClose} label="lowest close" stroke="red" strokeDasharray="5 5"/>
                </LineChart>
            </div>
        </ResponsiveContainer>
    )
}

//get length of stock data