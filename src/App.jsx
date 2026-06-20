import { useEffect, useState } from "react";
import './App.css'
import { nanoid } from "nanoid";
import NewPlan from "./newPlan";
import Tasks from "./Tasks";

function App() {
  const json = {
    planned: [
      { id: nanoid(), mission: 'Пример', isOpenMenu: false, isEdit: false }
    ],
    progress: [],
    completed: [],
  }


  const [value, setValue] = useState('')
  const [valueEdit, setValueEdit] = useState('')
  const [table, setTable] = useState(json)
  const [isOpenNew, setOpenNew] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('table') !== null) {
      setTable(JSON.parse(localStorage.getItem('table')))
    } else {
      localStorage.setItem('table', JSON.stringify(json))
    }
  }, [])

  function isOpenMenu(id) {
    setTable(isTable => {
      const res = isTable.planned.map((elem) => {
        if (id == elem.id) {
          return { ...elem, mission: !elem.isOpenMenu }
        }
        return elem
      })
      const json = {
        planned: res,
        progress: [...table.progress],
        completed: [...table.completed],
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })

  }

  function editTask(id) {
    console.log(valueEdit)
    if(valueEdit == '') return;
    setTable(isTable => {
      const res = isTable.planned.map((elem) => {
        if (id == elem.id) {
          return { ...elem, mission: valueEdit }
        }
        return elem
      })
      const json = {
        planned: res,
        progress: [...table.progress],
        completed: [...table.completed],
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })
    setValueEdit('')
    isEdit(id)
    isOpenMenu(id)
  }

  function isEdit(id){
    setTable(isTable => {
      const res = isTable.planned.map((elem) => {
        if (id == elem.id) {
          return { ...elem, isEdit: !elem.isEdit }
        }
        return { ...elem, isEdit: false }
      })
      const json = {
        planned: res,
        progress: [...table.progress],
        completed: [...table.completed],
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })
  }

  function isOpenMenu(id){
    setTable(isTable => {
      const res = isTable.planned.map((elem) => {
        if (id == elem.id) {
          return { ...elem, isOpenMenu: !elem.isOpenMenu }
        }
        return elem
      })
      const json = {
        planned: res,
        progress: [...table.progress],
        completed: [...table.completed],
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })
  }

  function newPlan() {
    if (value == '') {
      setValue('')
      return
    }
    const json = {
      planned: [
        ...table.planned,
        { id: nanoid(), mission: value, isOpenMenu: false, isEdit: false }
      ],
      progress: [...table.progress],
      completed: [...table.completed],
    }
    setTable(json)
    setOpenNew(false)
    setValue('')
    localStorage.setItem('table', JSON.stringify(json))
  }

  return (<>
    <div className="tables">
      <section className="table planned">
        <div className="name">
          Запланировано
          <button onClick={() => setOpenNew(true)} >+</button>
        </div>
        <div className="info">
          <Tasks
            table={table}
            editTask={editTask}
            type='planned'
            isOpenMenu={isOpenMenu}
            valueEdit={valueEdit}
            setValueEdit={setValueEdit}
            isEdit={isEdit}
          />
        </div>
      </section>
      <section className="table progress">
        <div className="name">
          В процессе
        </div>
        <div className="info">
        </div>
      </section>
      <section className="table completed">
        <div className="name">
          Завершено
        </div>
        <div className="info">
        </div>
      </section>
    </div>
    {isOpenNew && <NewPlan newPlan={newPlan} setOpenNew={setOpenNew} value={value} setValue={setValue} />}
  </>);
}

export default App;