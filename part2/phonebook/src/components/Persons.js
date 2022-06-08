import React from 'react';


const Persons = ({showPersons, handleDelete}) => {
    return (
    <>
        {showPersons.map((person) => <p key={person._id}>{person.name} {person.number}<button onClick={()=>handleDelete(person._id, person.name)}>delete</button></p>)}
    </>);
}
 
export default Persons;