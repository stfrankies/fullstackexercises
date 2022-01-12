import React from 'react';

const AddPerson = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) => {
    return ( <p>
        <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </p> 
    );
}
 
export default AddPerson;