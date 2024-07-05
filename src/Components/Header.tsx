import styles from './header.module.css'
export default function Header({symbolData}) {
    return (
        <div className={styles.container}> 
            <div className={styles.text}>
                {symbolData}
            </div>
        </div>
    )
}