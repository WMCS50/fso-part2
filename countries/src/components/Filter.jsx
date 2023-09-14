import React from "react";

//allows for user input via a form, then as user enters input, calls to the filter handle
const Filter = ({ countriesFilter, handleCountriesFilter }) => {
    return(
        <form>
            <div>
                find countries <input value={countriesFilter} onChange={handleCountriesFilter}/>
            </div>
        </form>
    )
}
export default Filter;