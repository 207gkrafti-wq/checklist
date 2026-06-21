import { useEffect, useState } from "react";
import './App.css'
import { nanoid } from "nanoid";
import NewPlan from "./newPlan";
import Tasks from "./Tasks";

function App() {
  const json = {
    planned: [
      { id: nanoid(), mission: 'Пример', openMenu: false, isEdit: false },
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

  function delTask(id, type) {
    setTable(isTable => {
      const index = isTable[type].findIndex(elem => id == elem.id)

      let json;
      if (type == 'planned') {
        json = {
          planned: [
            ...table[type].slice(0, index),
            ...table[type].slice(index + 1)
          ],
          progress: [...table.progress],
          completed: [...table.completed],
        }
      } else if (type == 'progress') {
        json = {
          planned: [...table.planned],
          progress: [
            ...table[type].slice(0, index),
            ...table[type].slice(index + 1)
          ],
          completed: [...table.completed],
        }
      } else if (type == 'completed') {
        json = {
          planned: [...table.planned],
          progress: [...table.progress],
          completed: [
            ...table[type].slice(0, index),
            ...table[type].slice(index + 1)
          ],
        }
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })
  }

  function isOpenMenu(id, type) {
    isEdit()
    setTable(isTable => {
      const res = isTable[type].map((elem) => {
        if (id == elem.id) {
          return { ...elem, openMenu: !elem.openMenu }
        }
        return { ...elem, openMenu: false }
      })
      let json;
      if (type == 'planned') {

        json = {
          planned: res,
          progress: [...table.progress],
          completed: [...table.completed],
        }
      } else if (type == 'progress') {
        json = {
          planned: [...table.planned],
          progress: res,
          completed: [...table.completed],
        }
      } else if (type == 'completed') {
        json = {
          planned: [...table.planned],
          progress: [...table.progress],
          completed: res,
        }
      }
      localStorage.setItem('table', JSON.stringify(json))
      return json
    })

  }

  function editTask(id, type) {
    if (valueEdit == '') return;
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
    isOpenMenu(id, type)
  }

  function isEdit(id) {
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



  function newPlan() {
    if (value == '') {
      setValue('')
      return
    }
    const json = {
      planned: [
        { id: nanoid(), mission: value, openMenu: false, isEdit: false },
        ...table.planned,
      ],
      progress: [...table.progress],
      completed: [...table.completed],
    }
    setTable(json)
    setOpenNew(false)
    setValue('')
    localStorage.setItem('table', JSON.stringify(json))
  }

  function nextTask(id, type) {
    isEdit()
    isOpenMenu(id, type)
    setTable(isTable => {
      let taskToMove = null;
      const filteredArray = isTable[type].filter(elem => {
        if (id == elem.id) {
          taskToMove = { ...elem }
          return false;
        }
        return true;
      })
      let json;
      if (type == 'planned') {
        json = {
          planned: filteredArray,
          progress: [
            taskToMove,
            ...isTable.progress,
          ],
          completed: [...isTable.completed],
        }

      } else if (type == 'progress') {
        json = {
          planned: [...isTable.planned],
          progress: filteredArray,
          completed: [
            taskToMove,
            ...isTable.completed,
          ],
        }
      }

      localStorage.setItem('table', JSON.stringify(json))
      return json
    })


  }

  return (<>
    <div className="tables">
      <section className="table planned">
        <div className="name">
          <p>
            Запланировано:
            {table.planned.length}
            <button onClick={() => setOpenNew(true)} >+</button>
          </p>
          <hr />
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
            delTask={delTask}
            nextTask={nextTask}
          />
        </div>
      </section>
      <section className="table progress">
        <div className="name">
          <p>
            В процессе:
            {table.progress.length}
          </p>
          <hr />
        </div>
        <div className="info">
          <Tasks
            table={table}
            type='progress'
            isOpenMenu={isOpenMenu}
            delTask={delTask}
            nextTask={nextTask}
          />
        </div>
      </section>
      <section className="table completed">
        <div className="name">
          <p>
            Завершено:
            {table.completed.length}
          </p>
          <hr />
        </div>
        <div className="info">
          <Tasks
            table={table}
            type='completed'
            isOpenMenu={isOpenMenu}
            delTask={delTask}
          />
        </div>
      </section>
    </div>
    {isOpenNew && <NewPlan newPlan={newPlan} setOpenNew={setOpenNew} value={value} setValue={setValue} />}
  </>);
}
export default App;