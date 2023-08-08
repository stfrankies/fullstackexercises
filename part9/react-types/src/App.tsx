import React from 'react';
import Header from './Header'
import Content from './Content';
import Total from './Total';


function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <h1><Header heading={courseName}/></h1>
      <>{courseParts.map((coursePart, i )=> <Content key={i} exerciseCount={coursePart.exerciseCount} name={coursePart.name}/>)}</>
        
      <p>Number of exercises{" "}
        <Total total={total}/>
      </p>
    </div>
  );
}

export default App;
