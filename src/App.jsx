import axios from 'axios'
import error from "eslint-plugin-react/lib/util/error.js";


function App() {
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            console.log(response.data)
        } catch (error) {
            console.error('Er is iets misgegaan', error);
        }
    };
    return (
        <>
        <h1>Landen overzicht</h1>
            <button onClick = {fetchCountries}>Haal landen op</button>
</>
    );
}

export default App;