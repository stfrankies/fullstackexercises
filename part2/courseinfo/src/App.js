import React from 'react'

const Header = (props) =>{
  return <h1>{props.name}</h1>;
}

const Total = ({parts}) =>{
  const total = parts.map((part)=>{return part.exercises}).reduce((part, next)=>{
    return part + next;
  })
  return(
    <h4>total of {total} exercises</h4>
  )
}

const Part = (props) =>{
  return <p>{props.name} {props.exercise}</p>;
}

const Content = (props) =>{
  return(
    <div>
      {props.parts.map((part, i) =><Part key={i} name={part.name} exercise ={part.exercises}/>)}
    </div> 
  )
}

const Course = ({course}) =>{
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


  // const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <Course course={course}/>
  )
}

export default App