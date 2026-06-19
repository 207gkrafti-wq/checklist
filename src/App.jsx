import Completed from "./Completed";
import Planned from "./Planned";
import Progress from "./Progress";
import './App.css'

function App() {



  return (<>
    <div className="tables">
      <section className="table planed">
        <Planned />
        a
      </section>
      <section className="table progress">
        <Progress />
        a
      </section>
      <section className="table completed">
        <Completed />
        a
      </section>
    </div>
  </>);
}

export default App;