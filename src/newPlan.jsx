import './newPlan.css'
function NewPlan({ newPlan, setOpenNew, value, setValue }) {

    return (<>
        <div className="form">
            <div className="form-elem">
                <h3>Добавь заметку</h3>
                <button className='close' onClick={() => { setOpenNew(false); setValue('') }}>⨉</button>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyUp={(e)=>{if(e.key === 'Enter') newPlan()}} autoFocus />
                <button className='form-add' onClick={newPlan} >Добавить</button>
            </div>
        </div>
    </>);
}

export default NewPlan;