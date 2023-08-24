import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";
import WeatherDetails from "./components/WeatherDetails";

const App = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [weather, setWeather] = useState(null); // State for weather data


	const generateResults = () => {
		if (data.length > 10 && search === "") {
			return;
		} else if (data.length > 10) {
			return <p>Too many matches, specify another filter.</p>;
		} else if (data.length === 1) {
			return CountryDetails(data[0]);
		} else if (data.length === 0) {
			return <p>No matches, specify another filter.</p>;
		} else if (data.length <= 10) {
			return (
				<div>
					{data.map((country) => (
						<div key={country.ccn3}>
							{country.name.common}
							<button onClick={() => setSelectedCountry(country)}>
								Show
							</button>
						</div>
					))}
				</div>
			);
		}
	};

	

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			const data = response.data;
			setData(
				data.filter((country) =>
					country.name.common.toLowerCase().includes(search.toLowerCase())
				)
			);
		});
	}, [search]);

	const fetchWeatherData = async (capital) => {
        try {
            const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        if (selectedCountry) {
            fetchWeatherData(selectedCountry.capital[0]);
        } else if (data.length === 1) {
            fetchWeatherData(data[0].capital[0]);
        }
    }, [selectedCountry, data]);



	return (
		<div className="App">
			Find Countries:{" "}
			<input
				type="search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
{selectedCountry ? (
                <>
                    {CountryDetails(selectedCountry)}
                    {weather && (
                        <WeatherDetails
                            capital={selectedCountry.capital[0]}
                            weather={weather}
                        />
                    )}
                </>
            ) : data.length === 1 ? (
                <>
                    {CountryDetails(data[0])}
                    {weather && (
                        <WeatherDetails
                            capital={data[0].capital[0]}
                            weather={weather}
                        />
                    )}
                </>
            ) : (
                generateResults()
            )}
			</div>
	);
};

export default App;
