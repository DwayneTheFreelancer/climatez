import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchByCity from './components/SearchByCity';
import ExtraDetails from './components/ExtraDetails';
import Forecast from './components/Forecast';
import Sunny from './components/Sunny';
import Cloudy from './components/Cloudy';
import Rainy from './components/Rainy';
import Snowy from './components/Snowy';
import SuggestBtn from './components/SuggestBtn';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const URL_DATA = `&units=imperial&appid=`;
const FORECASTBASEURL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const FORECASTDATA = `&units=imperial&appid=`;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      city: "brooklyn",
      description: "",
      feels_like: "",
      humidity: "",
      temp_min: "",
      temp_max: "",
      list: [],
      time: "",
      type: ""
    };
    this.nycWeather = this.nycWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchCity = this.searchCity.bind(this);
    this.forecast = this.forecast.bind(this);
    this.weatherBackground = this.weatherBackground.bind(this);
  }
  
  componentDidMount() {
    this.nycWeather();
    this.searchCity();
    this.forecast();
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  async searchCity() {
    try {
      const response = await axios.get(
        `${BASE_URL}${this.state.city}${URL_DATA}${API_KEY}`,
      )
      // Calls forecast function to update 3hr forecast for 5 days
      this.forecast();
      // Updates background image on city search based on temperature
      this.weatherBackground(response);
      this.setState({
        temp: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        city: response.data.name,
        feels_like: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity,
        temp_min: Math.round(response.data.main.temp_min),
        temp_max: Math.round(response.data.main.temp_max),
        type: response.data.weather[0].main
      });
    } catch (error) {
      alert("City Not Found");
    }
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    this.searchCity();
    document.querySelector("#standard-basic").value = "";
  }
  
  // Changes background image according to temperature
  weatherBackground(response) {
    if (response.data.weather[0].main === "Clear") {
      document.getElementsByTagName("body").className = "";
      document.querySelector("body").className = "beach";
    } else if (response.data.weather[0].main === "Clouds") {
      document.getElementsByTagName("body").className = "";
      document.querySelector("body").className = "clouds";
    } else if (response.data.weather[0].main === "Mist") {
      document.getElementsByTagName("body").className = "";
      document.querySelector("body").className = "mist";
    } else if (response.data.weather[0].main === "Rain") {
      document.getElementsByTagName("body").className = "";
      document.querySelector("body").className = "rain";
    }
  }
  
  async nycWeather() {
    axios
      .get(
        `${BASE_URL}${this.state.city}${URL_DATA}${API_KEY}`,
        {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        this.setState({ 
          temp: Math.round(response.data.main.temp), 
          description: response.data.weather[0].description,
          city: response.data.name,
          feels_like: Math.round(response.data.main.feels_like),
          humidity: response.data.main.humidity,
          temp_min: Math.round(response.data.main.temp_min),
          temp_max: Math.round(response.data.main.temp_max),
          type: response.data.weather[0].main
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  async forecast() {
    axios.get(`${FORECASTBASEURL}${this.state.city}${FORECASTDATA}${API_KEY}`, {
      "Accept": "application/json",
      "Content-Type": "application/json",
    })
    .then(response => {
      this.setState({ list: response.data.list });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="main-weather">
        <SuggestBtn temp={this.state.temp} type={this.state.type} />
        <SearchByCity city={this.state.city} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <div className="weather-data">
          <h1>{this.state.city}</h1>
          <h1 className="current-temp">{this.state.temp}°</h1>
          <div className="weather-icon">
            {this.state.type === "Clear" ? <Sunny /> : '' || this.state.type === "Clouds" || "Mist" ? <Cloudy /> : 'not working' || this.state.type === "Rain" ? <Rainy /> : '' || this.state.type === "Snow" ? <Snowy /> : ''}
          </div>
          <Forecast city={this.state.city} list={this.state.list} time={this.state.time} temp={this.state.temp} icon={this.state.description} />
          <ExtraDetails feels_like={this.state.feels_like} humidity={this.state.humidity} low={this.state.temp_min} high={this.state.temp_max} />
        </div>
      </div>
    );
  }
}

export default App;
