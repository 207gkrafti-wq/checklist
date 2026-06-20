
function Menu({ editTask, type, id, isEdit, elemIsEdit }) {
    return (<>
        <div className="edit">
            {
                type == 'planned' ?
                    (
                        elemIsEdit ?
                            <button onClick={() => editTask(id)}>Сохранить</button>
                            : <button onClick={() => isEdit(id)}>Изменить</button>
                    )
                    : null
            }
            <button>Удалить</button>
        </div>
    </>)
}

export default Menu;