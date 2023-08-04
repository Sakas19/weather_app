import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const apiKey = "e7136b7cbdd236cf44d2abb469af9dc2"; 

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setWeatherData(null);
      setError("City not found");
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "fas fa-sun"; 
      case "Clouds":
        return "fas fa-cloud"; 
      case "Rain":
        return "fas fa-cloud-showers-heavy"; 
      case "Snow":
        return "fas fa-snowflake"; 
      case "Thunderstorm":
        return "fas fa-bolt"; 
      case "Mist":
      case "Smoke":
      case "Haze":
        return "fas fa-smog"; 
      default:
        return "fas fa-question"; 
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
          <i className={getWeatherIcon(weatherData.weather[0].main)}></i>
        </div>
      )}

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default App;




