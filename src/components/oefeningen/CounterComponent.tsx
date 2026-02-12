import { useState } from "react";

function CounterComponent(){

const [counter, setCounter] = useState(0)
const CounterPlus = () => (setCounter(counter + 1))

const [counter2, setCounter2] = useState(0)

return(
    <div>
        <p>{counter}counter 1</p>
        <button onClick={CounterPlus}>+</button>
        <p>{counter % 2 === 0 ? "even" : "oneven" }</p>

        <p>{counter2}counter 2</p>
        <button onClick={() => setCounter2(counter2 + 1)}>++</button>
    </div>

    
)
}
export default CounterComponent