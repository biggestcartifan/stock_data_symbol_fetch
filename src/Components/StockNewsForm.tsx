import { useState, useEffect } from "react";
import styles from './stocknewsform.module.css'
import moment from "moment";

export default function StockNewsForm() {
    const URL = "https://finnhub.io/api/v1/news?category=general&token=";
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY_2

    const [generalNews, setGeneralNews] = useState([])
    const [generalTime, setGeneralTime] = useState([])
    const [articleLink, setArticleLink] = useState([])

    useEffect(()=>{
        async function marketNews() {
            const res = await fetch(`${URL}${API_KEY}`);
            const data = await res.json();
    
            const firstNews = data.slice(0, 5).map(news=>news.headline);
            setGeneralNews(firstNews);

            const firstDate = data.slice(0,5).map(date=>moment.unix(date.datetime).format('YYYY-MM-DD hh:mm A'));
            setGeneralTime(firstDate)

            const firstLink = data.slice(0, 5).map(link=>link.url);
            setArticleLink(firstLink)
        }
        marketNews()

        
        const refresh = setInterval(()=>{
            marketNews();
        }, 5*60*1000); //refresh news every twenty minutes

        return () => clearInterval(refresh); 
        
    }, [])

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Market News
                </h1>
                <div className={styles.news}>
                    {generalNews.map((item, index)=><h1 key={index}>
                        <a href={articleLink[index]} target="_blank" rel="noopener noreferrer">{item}</a> <p></p>{generalTime[index]}
                        <hr/>
                    </h1>)}
                </div>
            </div>
        </div>
    )
}