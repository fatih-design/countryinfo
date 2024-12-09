import axios from 'axios'
import error from "eslint-plugin-react/lib/util/error.js";
import React, {useState} from 'react';

function App() {
    const [countries, setCountries] = useState([]);
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const sortedCountries = response.data
                .map((country) => ({
                 name: country?.name.common || "Onbekend",
                    population: country?.population || 0,
                    flags: country?.flags.png || "",

                }))
                .sort((a, b) => a.population - b.population);
            setCountries(sortedCountries);
        } catch (error) {
            console.error('Er is iets misgegaan', error);
        }
    };
    return (
        <>
            <h1>Landen overzicht</h1>
            <button onClick={fetchCountries}>Haal landen op</button>
            <ul>{countries.map((country, index) => (
                <li key={index}>{country.name} - {country.population} - <img
                    src={country.flags} alt={`Vlag van ${country.name}`}
                    width="20"/></li>
            ))}
            </ul>
        </>
    );
}

export default App;