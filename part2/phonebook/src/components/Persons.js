import React from 'react';


const Persons = ({showPersons, handleDelete}) => {
    return (
    <>
        {showPersons.map((person) => <p key={person.id}>{person.name} {person.number}<button onClick={()=>handleDelete(person.id, person.name)}>delete</button></p>)}
    </>);
}
 
export default Persons;