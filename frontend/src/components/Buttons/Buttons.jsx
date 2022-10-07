import styles from './Buttons.module.css'

export function Buttons({arrayOfPages, page, changePage}) {
  return (
    <div className={styles.buttons}>
      {arrayOfPages.length > 1 && arrayOfPages.map((item, index) => {
        return (
          <button
            key={index}
            className={page === index + 1 ? styles.buttonActive : styles.button} 
            onClick={() => changePage(index + 1)}
          >{index + 1}</button>
        )
      })}
    </div>
  )
}