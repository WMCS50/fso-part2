import React from "react";
import { useEffect, useState} from 'react';
import axios from 'axios';

const Weather = ({capital, latlng}) => {
    //access the value of the API key; in command line had to:
    //set "VITE_API_KEY=**the key**" && npm run dev
    const api_key = import.meta.env.VITE_API_KEY
    const [weather, setWeather] = useState([])
    const lat = latlng[0]
    const lng = latlng[1]

    //fetch weather data from api -- for some reason, I got 401 not authorized error for 3.0; so had to use 2.5
    useEffect(() => {
        axios
       .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
        .then(response => {setWeather(response.data)})
        .catch(error => console.error(error))
        }, [])
        
    if (weather.length === 0) {
        return null
    }    
    else {
        const iconCode = weather.weather[0].icon
        const imageLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={imageLink} alt="icon of the weather"/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Weather;