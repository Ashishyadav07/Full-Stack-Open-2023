import React from 'react';

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>{person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
        
      ))}
    </div>
  );
}

export default Persons;
