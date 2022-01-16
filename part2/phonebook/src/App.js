import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter] = useState('') 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  
  const addName = (e) =>{
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber
    }

    const checkname = persons.filter(person => newName.toLowerCase().match(person.name.toLowerCase()));
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
        <PersonForm filter={filter} filterChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <AddPerson 
        addName = {addName}
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons}/>
    </div>
  )
}

export default App