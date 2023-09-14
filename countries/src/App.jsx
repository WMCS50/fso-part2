import { useEffect, useState} from 'react';
import axios from 'axios';
import Filter from "./components/Filter";
import SingleCountryInfo from "./components/SingleCountryInfo";
import ButtonCountries from "./components/ButtonCountries";


const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')

  //fetch all countries data from rest countries api
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {setCountries(response.data)})
        .catch(error => console.error(error))
  }, [])
  
  //filters the list of countries to ones that include input text  
  const handleCountriesFilter = (event) => {
    setCountriesFilter(event.target.value)
  }

  const filteredCountries = countries.filter((country) => 
    country.name.common.toLowerCase().includes(countriesFilter.toLowerCase()))
    console.log('filteredCountries', filteredCountries)

  //shows information dependent on how many countries filtered
  const CountriesToShow = ({filteredCountries}) => {

    //need this for no error on first render
    if (filteredCountries.length === 0) {
      return null;
    }
    else if (filteredCountries.length > 10) {
      return ('Too many matches, specify another filter')
    }
    else if (filteredCountries.length === 1) {
      return (
        <SingleCountryInfo country={filteredCountries[0]}/>
      )
    }
    else if (filteredCountries.length > 1) {
      return (
        <div> 
          {filteredCountries.map((country, i) => (
            <div key={i}>
              <ButtonCountries country={country}/>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div>
      <Filter countriesFilter={countriesFilter} handleCountriesFilter={handleCountriesFilter}/>
      <CountriesToShow filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App


