import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  
  //fetches initial data from json-server
  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => console.error(error))
  }, [])


  //adds person to phonebook
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    //check if new name is already in phonebook
    //for each person in phonebook, compare lower case name to the lower case new name
    const checkPerson = persons.find(person => person.name.toLowerCase() === 
    personObject.name.toLowerCase())
    
    //if name exists, asks to override existing number with a new one; else add new name and info
    const updatedPerson = { ...checkPerson, number: newNumber}
    
    if (checkPerson) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personsService
        .update(checkPerson.id, updatedPerson)
        .then(update => {
          setPersons(persons.map(person => person.id !== checkPerson.id ? person : update))})
        .catch(error => {
          if (error.response.status === 404) {
            setNotification({
              text: `${checkPerson.name} has already been removed from server`,
              type: 'error'
            })
          }
          else {
            setNotification({
              text: error.response.data.error,
              type: 'error'
            })
          }
        })  
          setNotification({
            text: `Note ${checkPerson.name}'s number has been updated`,
            type: 'notification'})
          setTimeout(() => {setNotification(null)}, 5000)
             
    //if name is not currently in phonebook, add name and number        
    } else {
    
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))})
        .catch(error => {
          setNotification({
            text: error.response.data.error,
            type: 'error'
          })
        })
        setNotification({
          text: `${personObject.name} has been added to the phonebook`,
          type: 'notification'})
        setTimeout(() => {setNotification(null)}, 5000)
        setNewName('')
        setNewNumber('')
        
    }
  }
  
const handleAddName = (event) => {
  setNewName(event.target.value)
}

const handleAddNumber = (event) => {
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

const handleDelete = (person) => {
  if (window.confirm(`Delete ${person.name} ?`)) 
    personsService
      .deletePerson(person.id)
      .then((_) => {
        setPersons(persons.filter((item) => item.id !== person.id))
        setNotification({
          text: `${person.name} has been deleted from the phonebook`,
          type: `notification`})
        setTimeout(() => {setNotification(null)}, 5000)
    })
      .catch(error => console.error(error))
}

const filteredList = persons.filter((person) => 

  person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('filteredList', filteredList)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      </div>
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredList = {filteredList} handleDelete = {handleDelete}/>
    </div>
    
  )
}

export default App