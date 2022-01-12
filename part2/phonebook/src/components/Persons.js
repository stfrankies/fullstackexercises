import React from 'react';


const Persons = ({showPersons}) => {
    return (<p>
        {showPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </p>);
}
 
export default Persons;