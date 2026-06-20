
function NewPlan({ newPlan, setOpenNew, value, setValue }) {

    return (<>
        <div className="form">
            <button onClick={() => {setOpenNew(false); setValue('')}}>⨉</button>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={newPlan} >Добавиь</button>
        </div>
    </>);
}

export default NewPlan;