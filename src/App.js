import { useState } from "react";
import "./styles.css";

export default function App() {
 return <div className='App'>
  <TipCalculator/>
  </div>
}

const satisfactionLevels = [
  { description: "Desatified(0%)", value: 0 },
  { description: "It was good(5%)", value: 5 },
  { description: "It was okay(10%)", value: 10 },
  { description: "It was absolutely amazing!(20%)", value: 20 },
];

function  TipCalculator() {
  const [ bill, setBill ] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  
  const tip = bill * (percentage1 + percentage2) / 2 / 100
 
  function resetInputs () {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  };

  
  return <div>
    <BillInput onInputBill={setBill}/>
    <SatisfactionLevel satisfaction={percentage1} onSelect={setPercentage1}>
      How did you like the service?
    </SatisfactionLevel>
    <SatisfactionLevel satisfaction={percentage2} onSelect={setPercentage2}>
      How did your friend like the service?
    </SatisfactionLevel>
    
    {bill > 0 && (
    <>
    <BillOutput bill={ bill } tip={tip} />
    <ButtonReset  onReset={resetInputs}/>
    </>
    )}
  </div>;
}


function BillInput({bill, onInputBill}) {
  return <div>
    <label>How much was the bill?</label>
    <input type="number" value={bill} onChange={(e)=>onInputBill(Number(e.target.value))}
    placeholder="Bill amount"
    />
  </div>; 
}


function SatisfactionLevel({ children, satisfaction, onSelect }) {
  return <div>
    <label>{ children }</label>
    <select value={satisfaction} onChange={(e)=>onSelect(Number(e.target.value))}>
      { satisfactionLevels.map(level => <option value={ level.value } key={level.value}>{ level.description }</option>) }
    </select>
  </div>;
}


function BillOutput({ bill, tip }) {
  return <h2>
    You pay ${bill + tip} (${bill} + ${tip} tip)
    </h2>;
}


function ButtonReset({onReset}) {
  return <button onClick={onReset}>Reset</button>;
}
