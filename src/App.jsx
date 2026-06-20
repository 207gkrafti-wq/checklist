import { useEffect, useState } from "react";
import Completed from "./Completed";
import Planned from "./Planned";
import Progress from "./Progress";
import './App.css'
import { nanoid } from "nanoid";
import NewPlan from "./newPlan";

function App() {
  const json = {
    planned: [
      { id: nanoid(), mission: 'Пример' }
    ],
    progress: [],
    completed: [],
  }


  const [value, setValue] = useState('')
  const [table, setTable] = useState(json)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('table') !== null) {
      setTable(JSON.parse(localStorage.getItem('table')))
    } else {
      localStorage.setItem('table', JSON.stringify(json))
    }
  }, [])

  function editPlan() {

  }

  function newPlan() {
    const json = {
      planned: [
        ...table.planned,
        { id: nanoid(), mission: value }
      ],
      progress: [...table.progress],
      completed: [...table.completed],
    }
    setTable(json)
    setOpen(false)
    setValue('')
    localStorage.setItem('table', JSON.stringify(json))
  }

  return (<>
    <div className="tables">
      <section className="table planned">
        <div className="name">
          Запланировано
          <button onClick={() => setOpen(true)} >+</button>
        </div>
        <div className="info">
          <Planned
            table={table}
            editPlan={editPlan}
          />
        </div>
      </section>
      <section className="table progress">
        <div className="name">
          В процессе
        </div>
        <div className="info">
          <Progress />
        </div>
      </section>
      <section className="table completed">
        <div className="name">
          Завершено
        </div>
        <div className="info">
          <Completed />
        </div>
      </section>
    </div>
    {isOpen && <NewPlan newPlan={newPlan} setOpen={setOpen} value={value} setValue={setValue} />}
  </>);
}

export default App;