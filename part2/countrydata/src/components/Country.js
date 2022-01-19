import React, {useState} from 'react';

const CountrySelect= ({ country }) => {

  const [show, setShow] = useState(false)

  const handleDisplay = () => {
    setShow(!show)
  }

  return (
    <div>
      {country.name.common}
      <button onClick={handleDisplay}>show</button>
      {show && (<div>
        <h1>{country.name.official}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.official} width="10%" />
      </div>)}
    </div>
  )
}

    
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
        countrySearch.map((country, i) => <CountrySelect key={i} country={country} />) : <p></p>}
    </div>
    );
}
 
export default Country;