import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filter, setFilter] = useState('') 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  
  const addName = (e) =>{
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber
    }

    const checkname = persons.filter(person => new RegExp(`^${newName}$`, "i").test(person.name));
    if(checkname.length > 0){
      window.alert(`${newName} has already been added to the phonebook`);
    }
    else{
      setPersons(persons.concat(personObj));
    }
  }

  const showPersons = filter ? persons.filter(person => new RegExp(filter, "i").test(person.name)) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App