import React, { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './components/service'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter] = useState('') 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleDelete = (id, name) =>{
    let del = window.confirm(`are you sure you want to delete ${name}`)
    if(del === true){
        personService.remove(id).then(response => (response.statusText === "OK") ? setPersons(persons.filter(person => person.id !== id)) : "An error occured!")
    }
   }


  useEffect(() => {
    personService.getAll().then(response => {
      console.log(response)
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
      const update = window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one`);
      if (update){
        console.log(checkname)
        personService.update(checkname[0].id, personObj).then(response => {
          const updatePerson = persons.map(person => (person.id === checkname[0].id) ? {...person, number: response.data.number} : person)
          console.log(updatePerson);
          setPersons(updatePerson);
        })
      }
      return
    }
    personService.create(personObj).then(response => setPersons(persons.concat(response.data)))
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
      <Persons showPersons={showPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App