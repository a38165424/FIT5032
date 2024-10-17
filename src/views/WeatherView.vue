<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="city" 
            placeholder="Enter city name" 
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <main>
        <div v-if="weatherData">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "02e4efc8caf2a572f2bafc63506447fa"; 
  
  export default {
    data() {
      return {
        city: "",           
        weatherData: null,  
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    methods: {
      async searchByCity() {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .header {
    text-align: center;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .search-button {
    padding: 10px;
    font-size: 16px;
  }
  
  main {
    text-align: center;
  }
  
  </style>
  