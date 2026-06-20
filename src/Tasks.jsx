import Edit from "./Edit";

function Tasks({table, editTask, type}) {

    const result = table[type].map(elem => {
        return <li key={elem.id}>
            {elem.mission}
            <span>•••</span>
            <Edit
                id={elem.id}
                editPlan={editPlan}
            />
        </li>
    })

    return (<>
        <ul>
            {result}
        </ul>
    </>);
}

export default Tasks;