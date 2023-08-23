import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

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

	return (
		<div className="App">
			Find Countries:{" "}
			<input
				type="search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
			{selectedCountry ? CountryDetails(selectedCountry) : generateResults()}
		</div>
	);
};

export default App;
