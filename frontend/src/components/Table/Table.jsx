import styles from './Table.module.css'

export function Table({table, firstIndex, lastIndex}) {
  return (
    <table className={styles.table}>

      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
	    </thead>

      <tbody>
        {table.length ? table.slice(firstIndex, lastIndex).map(row => {
          return (
            <tr key={row.id}>
              <td>{row.date.slice(0, 10)}</td>
              <td>{row.name}</td>
              <td>{row.amount}</td>
              <td>{row.distance}</td>
            </tr>
          )
        }) : null}
	    </tbody>

    </table>
  )
}