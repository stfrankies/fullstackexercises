import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import SearchForm from './components/SearchForm'

const App = () => {
  const [countries, setCountries ] = useState([])
  const [ filter, setFilter] = useState('') 

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])
  
  const handleFilterChange = (e) => setFilter(e.target.value);

  const queryCountry = countries.filter(country => new RegExp(filter, "i").test(country.name.official));

  const queryWeather = queryCountry.length === 1 ? queryCountry[0].capital[0] : ''

  return (
    <div>
      <h2>Find Countries: </h2>
        <SearchForm filter={filter} filterChange = {handleFilterChange}/>
        <Country queryCountry = {queryCountry} filter={filter} queryWeather={queryWeather}/>
    </div>
  )
}

export default App