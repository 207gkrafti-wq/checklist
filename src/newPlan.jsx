import './newPlan.css'
function NewPlan({ newPlan, setOpenNew, value, setValue }) {

    return (<>
        <div className="form">
            <div className="form-elem">
                <button className='close' onClick={() => { setOpenNew(false); setValue('') }}>⨉</button>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={newPlan} >Добавиь</button>
            </div>
        </div>
    </>);
}

export default NewPlan;