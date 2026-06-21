import { memo } from "react";
import './Menu.css'
function Menu({ editTask, type, id, isEdit, elemIsEdit, delTask, nextTask }) {
    return (<>
        <div className="edit">
            {
                type == 'planned' ?
                    (
                        elemIsEdit ?
                            <button onClick={() => editTask(id, type)}>Сохранить</button>
                            : <button onClick={() => isEdit(id)}>Изменить</button>
                    )
                    : null
            }
            {type != 'completed' && <button onClick={() => nextTask(id, type)}>Далее</button>}
            <button onClick={() => delTask(id, type)}>Удалить</button>
        </div>
    </>)
}

export default memo(Menu);