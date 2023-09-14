import React from "react";
import './SingleCountryInfo.css';
import Weather from '../components/Weather.jsx'

//once a single country is narrowed down by filter or by button click, this displays the relevant info
//calls to Weather since weather info is more involved
const SingleCountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="150px"/>
            <Weather capital={country.capital} latlng ={country.capitalInfo.latlng}/>
        </div>
      )
}

export default SingleCountryInfo;
