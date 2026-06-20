
function Edit({ editPlan, id }) {
    return (<>
        <div className="edit">
            <button onClick={() => editPlan(id)}>Изменить</button>
            <button>Удалить</button>
        </div>
    </>)
}

export default Edit;