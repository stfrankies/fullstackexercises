import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (e) =>{
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const addName = (e) =>{
    e.preventDefault();
    const personObj = {
      name: newName
    }
    const checkname = persons.filter(person => new RegExp(`^${newName}$`, "i").test(person.name));
    if(checkname.length > 0){
      window.alert(`${newName} is already added to the phonebook`);
    }
    else{
      setPersons(persons.concat(personObj));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name}</p>)}
    </div>
  )
}

export default App