import React from 'react';

const SearchForm = ({filter, filterChange}) => {
    return ( 
    <>
        filter shown with: <input value={filter} onChange={filterChange} />
    </> 
    );
}
 
export default SearchForm; 