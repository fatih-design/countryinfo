import axios from 'axios'
import error from "eslint-plugin-react/lib/util/error.js";
import React, {useState} from 'react';

function App() {
    const [countries, setCountries] = useState([]);
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const sortedCountries = response.data
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
                <li key={index}>{country?.name.common || "onbekend"} - {country?.population || "onbekend"} - <img
                    src={country?.flags.png || "onbekend"} alt={`Vlag van ${country.name.common || "onbekend"}`}
                    width="20"/></li>
            ))}
            </ul>
        </>
    );
}

export default App;