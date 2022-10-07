import { useEffect, useMemo, useState } from 'react';
import { Buttons } from '../Buttons/Buttons';
import { Form } from '../Form/Form';
import { Table } from '../Table/Table';
import styles from './App.module.css';

function App() {
  const [table, setTable] = useState([])
  const [copyTable, setCopyTable] = useState([])
  const [count, setCount] = useState(10)
  const [page, setPage] = useState(1)
  const [firstIndex, setFirstIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(count)
  const [form, setForm] = useState({column: 'name', condition: 'equals', value: ''})
  const arrayOfPages = useMemo(() => [...new Array(Math.ceil(copyTable.length / count))], [copyTable])
  
  function onChangeHandler(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    const copy = [...table]
    let filtered
    switch(form.condition) {
      case 'equals':
        filtered = copy.filter(item => String(item[form.column]) === form.value)
        break
      case 'contains':
        filtered = copy.filter(item => String(item[form.column]).includes(form.value)).sort((a, b) => a[form.column] - b[form.column])
        break
      case 'more':
        filtered = copy.filter(item => item[form.column] > form.value).sort((a, b) => a[form.column] - b[form.column])
      break
      case 'less':
        filtered = copy.filter(item => item[form.column] < form.value).sort((a, b) => b[form.column] - a[form.column])
      break
      default:
        filtered = copy
        break
    }
    changePage(1)
    setCopyTable(filtered)
  }

  function changePage(number) {
    if (number === 1) {
      setFirstIndex(0)
      setLastIndex(count)
      setPage(1)
    } else {
      setPage(number)
      setFirstIndex((number - 1) * count)
      setLastIndex((number) * count)
    }
  }

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(res => {
        setTable(res)
        setCopyTable(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.app}>
      <Form 
        onChangeHandler={onChangeHandler} 
        form={form} 
        onSubmitHandler={onSubmitHandler}
      />
      <Table 
        table={copyTable} 
        firstIndex={firstIndex} 
        lastIndex={lastIndex}
      />
      <Buttons 
        arrayOfPages={arrayOfPages} 
        changePage={changePage} 
        page={page}
      />
    </div>
  )
}

export default App
