import React from 'react';

    
const Country = ({countries, filter}) => {
    
    const countrySearch = countries.filter(country => new RegExp(filter, "i").test(country.name.official));
    console.log(countrySearch)
    
return (
    <div>
        { filter ?
        (countrySearch.length > 10) ? <p>too many matches, user more specific query</p> : (countrySearch.length === 1) ?
        countrySearch.map((country, index) =>
          <div key={index}>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
              {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.official} width="10%" />
          </div>) :
        countrySearch.map((country, i) => <p key={i}>{country.name.official}</p>) : <p></p>}
    </div>
    );
}
 
export default Country;