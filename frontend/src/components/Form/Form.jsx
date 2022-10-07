import styles from './Form.module.css'

export function Form({onChangeHandler, form, onSubmitHandler}) {
 
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>

      <div className={styles.inputContainer}>
        <label htmlFor='column'>Колонка</label>
          <select className={styles.select} id='column' name={'column'} onChange={onChangeHandler}>
            <option value={'name'}>Название</option>
            <option value={'amount'}>Количество</option>
            <option value={'distance'}>Расстояние</option>
          </select>
      </div>
     
      <div className={styles.inputContainer}>
        <label htmlFor='condition'>Условие</label>
          <select className={styles.select} id='condition' name={'condition'} onChange={onChangeHandler}>
            <option value={'equals'}>Равно</option>
            <option value={'contains'}>Содержит</option>
            <option value={'more'}>Больше</option>
            <option value={'less'}>Меньше</option>
          </select>
      </div>
     
      <div className={styles.inputContainer}>
        <label htmlFor='value'>Значение</label>
          <input
            className={styles.select}
            id='value'
            type={'text'} 
            value={form.value || ''}
            onChange={onChangeHandler}
            name={'value'}
          ></input>
      </div>
     
      <button className={styles.submitButton} type={'submit'}>Применить</button>
    </form>
  )
}