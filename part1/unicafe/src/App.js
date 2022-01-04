import React, { useState } from 'react'

const StatisticLine = (props) =>{
  return (
    <div>
      <p>{props.text}: {props.value}</p>
    </div>
  )
}

const Button = (props) =>{
  return <button onClick={props.increment}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all/3;
  const positive = good/all;

  return (
    <div>
      <h3>give feedback</h3>
        <Button increment={()=>setGood(good + 1)} text="good"/>
        <Button increment={()=>setNeutral(neutral + 1)} text="neutral"/>
        <Button increment={()=>setBad(bad + 1)} text="bad"/>

      <h3>statistics</h3>
      {(good || neutral || bad) ? <div>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
        </div> : <p>No feedback given yet</p>}
    </div>
  )
}

export default App