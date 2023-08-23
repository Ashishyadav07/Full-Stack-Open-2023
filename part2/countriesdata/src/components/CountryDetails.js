import React from "react";
const CountryDetails = (country) => {
    return (
        <div key={country.ccn3}>
            <h2>{country.name.common}</h2>
            <div>Capital City: {country.capital}</div>
            <div>Area: {country.area}</div>
            <div>
                <h3>Languages:</h3>
                <ul>
                    {Object.entries(country.languages).map((arr) => (
                        <li key={arr[0]}>{arr[1]}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} alt="flag" />
        </div>
    );
};

export default CountryDetails