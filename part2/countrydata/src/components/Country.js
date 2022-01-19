import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios'

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

    
const Country = ({queryCountry, filter, queryWeather}) => {
  const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(()=> {
      axios.get('http://api.weatherstack.com/current', {
        params:{
          access_key: process.env.REACT_APP_WEATHER_ACCESS_KEY,
          query: queryWeather,
          units: 'f'
        }
      }).then(res => {
        console.log(res.data)
        setWeatherInfo(res.data)
      })
    }, [queryWeather])
    
return (
    <div>
        { filter ?
        (queryCountry.length > 10) ? <p>too many matches, user more specific query</p> : (queryCountry.length === 1) ?
        queryCountry.map((country, index) =>
          <div key={index}>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
              {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>
            {weatherInfo.current && <div>
              <img src={country.flags.png} alt={country.name.official} width="10%"/>
              <h1>Weather in {country.capital}</h1>
              <p>Temperature: {weatherInfo.current.temperature + ' Farenheit'}</p>
              <img src={weatherInfo.current.weather_icons[0]} alt="weather-icon" width="5%" />
              <p>Wind Speed: {weatherInfo.current.wind_speed + ' MPH'}</p>
              </div>}
          </div>) :
        queryCountry.map((country, i) => <CountrySelect key={i} country={country} />) : <p></p>}
    </div>
    );
}
 
export default Country;