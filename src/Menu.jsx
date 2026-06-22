import { memo, useEffect, useState } from "react";
import './Menu.css'
function Menu({ editTask, type, id, isEdit, elemIsEdit, delTask, nextTask, openMenu }) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (openMenu) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 200)
            return () => clearTimeout(timer)
        } else {
            setIsOpen(false)
        }
    }, [openMenu])


    return (<>
        <div className={`menu ${isOpen && 'open'}`}>
            {
                type == 'planned' ?
                    (
                        elemIsEdit ?
                            <button className="save-or-edit" onClick={() => editTask(id, type)}>Сохранить</button>
                            : <button className="save-or-edit" onClick={() => isEdit(id)}>Изменить</button>
                    )
                    : null
            }
            {type != 'completed' && <button className="next" onClick={() => nextTask(id, type)}>Далее</button>}
            <button className="del" onClick={() => delTask(id, type)}>Удалить</button>
        </div>
    </>)
}

export default memo(Menu);