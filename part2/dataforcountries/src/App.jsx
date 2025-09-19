import {useEffect, useState} from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY
console.log(API_KEY)
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all/"

function Country({ selectedCountry: { capital, area, languages, flags }}) {
    const langs = Object.values(languages)

    const [weather, setWeather] = useState(null)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`

    useEffect(() => {
        axios.get(weatherUrl).then(res => {
            const weatherInfo = {
                temperature:res.data.main.temp - 273.15,
                wind:res.data.wind.speed,
                icon:res.data.weather[0].icon
            }
            setWeather(weatherInfo)
        })
    },[capital, weatherUrl])

    if(!weather){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{capital}</h1>
            <div>
                <div>Capital {capital}</div>
                <div>Area {area}</div>
            </div>
            <h2>Languages</h2>
            <ul>
                {langs.map((lang) => <li key={lang}>
                    {lang}
                </li>)}
            </ul>
            <img src={flags.png} alt={flags.alt} />
            <h2>Weather in {capital}</h2>
            <div>Temperature {weather.temperature.toFixed(2)} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${capital} weather`} />
            <div>Wind {weather.wind.toFixed(2)} m/s</div>
        </div>
    )
}

const CountryInfo = ({selectedCountries, handleShow}) => {
    if (!selectedCountries.length) return <div>Loading...</div>
    if (selectedCountries.length > 10) return <div>Too many matches, specify another filter</div>
    if (selectedCountries.length === 1) return <Country selectedCountry={selectedCountries[0]} />

    return (
        <ul>
            {selectedCountries.map(country => <li key={country.name.common}>
                {country.name.common}
                <button onClick={()=>handleShow(country.name.common)} type="button">Show</button>
            </li>)}
        </ul>
    )
}

function App() {
    const [filterText, setFilterText] = useState("")
    const [countries, setCountries] = useState([])

    const handleShow = (countryName) =>{
        setFilterText(countryName)
    }

    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setCountries(response.data)
        }).catch(error => {console.log(error)})
    }, [])

    const filteredCountries =  countries.length > 0 ? countries.filter(country => country.name.common.toLowerCase().includes(filterText.toLowerCase())) : []

    const handleChange = (e) => {
        setFilterText(e.target.value)
    }
    return (
        <div>
            find countries <input onChange={handleChange} value={filterText}/>
            <CountryInfo selectedCountries={filteredCountries} handleShow={handleShow} />
        </div>
    )
}
export default App