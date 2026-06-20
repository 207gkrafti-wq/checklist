import Menu from "./Menu";

function Tasks({ table, editTask, type, isOpenMenu, isEdit, setValueEdit, valueEdit }) {

    const result = table[type].map((elem, index) => {
        return <li key={elem.id}>
            {
                elem.isEdit ?
                    <input type="text" defaultValue={elem.mission} onChange={e => setValueEdit(e.target.value)} onFocus={()=>setValueEdit(elem.mission)} autoFocus />
                    : <span>{elem.mission}</span>
            }

            <button onClick={() => isOpenMenu(elem.id)}>•••</button>
            {elem.isOpenMenu &&
                <Menu
                    id={elem.id}
                    editTask={editTask}
                    isEdit={isEdit}
                    elemIsEdit={elem.isEdit}
                    type={type}
                    index={index}
                />
            }
        </li>
    })

    return (<>
        <ul>
            {result}
        </ul>
    </>);
}

export default Tasks;