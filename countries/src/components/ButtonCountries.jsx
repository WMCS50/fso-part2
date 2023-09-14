import React from "react";
import { useState} from 'react';
import SingleCountryInfo from './SingleCountryInfo'

//displays the name of the country and allows for a button for user to press in order to call for the relevant info
//the button controls a state that starts as false; when button is pressed, the state changes to the opposite
//when buttonState is false, no country information is shown on screen; when true (and there is info), country info is shown
const ButtonCountries = ({country}) => {
    const [buttonState, setButtonState] = useState(false)

    const handleClick = () => {
        setButtonState(!buttonState)
    }

    return (
        <li>
            {country.name.common} <button onClick={handleClick}>show</button>
            {buttonState && <SingleCountryInfo country={country}/>}
        </li>
    )
}

export default ButtonCountries



