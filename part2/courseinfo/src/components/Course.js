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
        {props.parts.map(part =><Part key={part.id} name={part.name} exercise ={part.exercises}/>)}
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

  export default Course;