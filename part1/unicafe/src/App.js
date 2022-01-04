import React, { useState } from 'react'

const Statistics = (props) =>{

  return (
    <div>
      <h3>statistics</h3>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>all: {props.good + props.neutral + props.bad}</p>
      <p>average: {(props.good + props.neutral + props.bad)/3}</p>
      <p>positive: {props.good/(props.good + props.neutral + props.bad)}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <button onClick={()=>setGood(good + 1)}>good</button>
      <button onClick={()=>setNeutral(neutral + 1)}>netral</button>
      <button onClick={()=>setBad(bad + 1)}>bad</button>
      {(good || neutral || bad) ? <Statistics good={good} neutral={neutral} bad={bad}/> : <p>No feedback given yet</p>}
    </div>
  )
}

export default App