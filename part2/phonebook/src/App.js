import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then(response => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebookService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => (person.id !== existingPerson.id ? person : returnedPerson)));
          setNewName('');
          setNewNumber('');

      setNotificationMessage(`Number is changed`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      phonebookService.create(newPerson).then(response => {
        setPersons([...persons, response]);
        setNewName('');
        setNewNumber('');

      setNotificationMessage(`Added ${response.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      });
    }
  };


  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };
  


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
