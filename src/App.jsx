import axios from 'axios'
import React, {useState,useEffect} from 'react';


function App() {
    const [countries, setCountries] = useState([]);
    const [search,setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const sortedCountries = response.data
                .map((country) => ({
                    name: country?.name.common || "Onbekend",
                    population: country?.population || 0,
                    flags: country?.flags.png || "",
                    region: country?.region || "Onbekend",

                }))
                .sort((a, b) => a.population - b.population);

            setCountries(sortedCountries);

            setfilteredCountries(sortedCountries);
        } catch (error) {
            console.error('Er is iets misgegaan', error);
        }

    };
    useEffect(() => {
        const filtred = countries.filter((country) =>
            country.name.toLowerCase().includes(search.toLowerCase())


        );setFilteredCountries(filtred);
    }, [search,countries]);
    return (
        <><h2>Zoeken</h2>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search}/>

            <ul>
                {filteredCountries.map((country, index) => (
                    <li key={index}>
                        {country.name} - {`Has a population of ${country.population}`} -
                        <img
                            src={country.flags}
                            alt={`Vlag van ${country.name}`}
                            width="20"
                        />
                    </li>
                ))}
            </ul>

            <h1>Landen overzicht</h1>
            <button onClick={fetchCountries}>Haal landen op</button>
            <ul>{countries.map((country, index) => (
                <li key={index}
                    style={{
                        color:
                            country.region === "Africa" ? "blue" :
                                country.region === "Europe" ? "yellow" :
                                    country.region === "Americas" ? "green" :
                                        country.region === "Asia" ? "red" :
                                            country.region === "Oceania" ? "purple" : "black"
                    }}>{country.name} - {`Has a population of ${country.population}`} - <img
                    src={country.flags} alt={`Vlag van ${country.name}`}
                    width="20"/></li>
            ))}
            </ul>
        </>
    );
}

export default App;