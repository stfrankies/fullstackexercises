import React from 'react';
import Notification from './Notification';

const AddPerson = ({addName, handleNameChange, handleNumberChange, newName, newNumber, message}) => {
    return ( 
    <>
    <Notification message = {message}/>
        <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </> 
    );
}
 
export default AddPerson;