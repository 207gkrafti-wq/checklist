import Edit from "./Edit";

function Planned({table, editPlan}) {

    const result = table.planned.map(elem => {
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

export default Planned;