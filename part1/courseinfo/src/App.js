import React from 'react'

const Header = (props) =>{
  return <h1>{props.course}</h1>;
}

const Total = (props) =>{
  return<p>Number of exercises {props.total}</p>;
}

const Part = (props) =>{
  return <p>{props.name} {props.exercise}</p>;
}

const Content = (props) =>{
  return(
    <div>
      <Part name = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part name = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part name = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </div> 
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <div>
      <Header course = {course}/>
      <Content 
        parts = {parts}
      />
      <Total total={total}/>
    </div>
  )
}

export default App