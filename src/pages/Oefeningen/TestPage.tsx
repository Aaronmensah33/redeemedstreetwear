import CounterComponent from "../../components/oefeningen/CounterComponent";
import UserCardComponent from "../../components/oefeningen/UserCardComponent";
import { useState } from "react";

function TestPage() {
  const[userinput, setInput] = useState("")

  return (
    <div>
        
    <CounterComponent />
    <hr/>
    <UserCardComponent
        name="wellem"
        gekocht={true}
        myInput={userinput}
        savedInput={{ myInput: userinput }}
    />
<input
className="border"
type="text"
value={userinput}
onChange={e => setInput(e.target.value)}
/>
<button onClick={() => console.log(userinput)}>Save Input</button>

   </div>
  );
}

export default TestPage;
