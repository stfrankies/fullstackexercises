import React from 'react';
import Header from './Header'
import Content from './Content';
import Total from './Total';


function App() {
  
  const courseName = "Half Stack application development";
  
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartDesc extends CoursePartBase {
    description: string
  }
  
  interface CoursePartBasic extends CoursePartDesc {
    description: string;
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDesc {
    description: string;
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDesc{
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <h1><Header heading={courseName}/></h1>
      <>{courseParts.map((coursePart, i )=> {
          const desc = coursePart.kind === "basic" || coursePart.kind === "background" ? coursePart.description : ""
          const req = coursePart.kind === "special" ? coursePart.requirements : [];
          return <Content key={i} exerciseCount={coursePart.exerciseCount} name={coursePart.name} kind={coursePart.kind} description={desc} requirements={req}/>
        })}</>  
      <p>Number of exercises{" "}
        <Total total={total}/>
      </p>
    </div>
  );
}

export default App;
