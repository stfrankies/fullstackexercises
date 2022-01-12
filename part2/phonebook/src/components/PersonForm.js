import React from 'react';

const PersonForm = ({filter, filterChange}) => {
    return ( <p>
        filter shown with: <input value={filter} onChange={filterChange} />
    </p> );
}
 
export default PersonForm;