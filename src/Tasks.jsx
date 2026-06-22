import { memo } from "react";
import Menu from "./Menu";
import './Tasks.css'

function Tasks({ table, editTask, type, isOpenMenu, isEdit, setValueEdit, valueEdit, delTask, nextTask }) {

    const result = table[type].map((elem, index) => {
        return (
            <li key={elem.id} >
                {elem.openMenu &&
                    <Menu
                        id={elem.id}
                        editTask={editTask}
                        isEdit={isEdit}
                        elemIsEdit={elem.isEdit}
                        type={type}
                        index={index}
                        delTask={delTask}
                        nextTask={nextTask}
                        openMenu={elem.openMenu}
                    />
                }
                {
                    elem.isEdit ?
                        <input className="edit-text" type="text" maxLength={255} defaultValue={elem.mission} onChange={e => setValueEdit(e.target.value)} onFocus={() => setValueEdit(elem.mission)} autoFocus />
                        : <p className="text" style={type === 'completed' ? { textDecoration: 'line-through' } : {}} >{elem.mission}</p>
                }

                <button className="open-menu" onClick={() => isOpenMenu(elem.id, type)}>•••</button>
            </li>
        )
    })

    return (<>
        <ul>
            {result}
            
        </ul>
    </>);
}

export default memo(Tasks);