
function NewPlan({ newPlan, setOpen, value, setValue }) {

    return (<>
        <div className="form">
            <button onClick={() => setOpen(false)}>⨉</button>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={newPlan} >Добавиь</button>
        </div>
    </>);
}

export default NewPlan;