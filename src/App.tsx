import Stock from "./Components/Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockInformation from "./Components/StockInformation";
import styles from './Components/app.module.css'
export default function App() {
  return (
    <Router>
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<Stock/>}/>
          <Route path="/information" element={<StockInformation/>}/>
        </Routes>
      </div>
    </Router>
  )
}