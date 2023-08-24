import React from "react";

const WeatherDetails = ({ capital, weather }) => {
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <div>Temperature: {(weather.main.temp-273.15).toFixed(2)} Celcius</div>
            <div>
                <img src={weatherIconUrl} alt={weather.weather[0].description} />
            </div>
            <div>Wind Speed: {weather.wind.speed} m/s</div>
        </div>
    );
};

export default WeatherDetails;
