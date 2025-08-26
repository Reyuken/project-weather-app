import  "./styles.css";
document.addEventListener("DOMContentLoaded",()=>{
const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const loading = document.getElementById('loading');

// --- 1. Fetch weather data ---
async function getWeather(location) {
  try {
    loading.classList.remove('hidden');
    weatherDisplay.innerHTML = "";

    const apiKey = "43VYKGSN2BVMK9TMSJ6STAW4A"; // from Visual Crossing or OpenWeather
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    console.log("Raw data:", data); // Step 2: see structure in console

    return processWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherDisplay.innerHTML = `<p>Could not fetch weather. Try again!</p>`;
  } finally {
    loading.classList.add('hidden');
  }
}

// --- 2. Process the JSON data ---
function processWeatherData(data) {
  return {
    location: data.resolvedAddress,
    description: data.description,
    temp: data.currentConditions.temp,
    humidity: data.currentConditions.humidity,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
  };
}

// --- 3. Display the data ---
function displayWeather(weather) {
  weatherDisplay.innerHTML = `
    <h2>${weather.location}</h2>
    <p>${weather.description}</p>
    <p>🌡️ ${weather.temp} °C</p>
    <p>💧 Humidity: ${weather.humidity}%</p>
    <p>☁️ ${weather.conditions}</p>
  `;
}

// --- 4. Hook into the form ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  const weather = await getWeather(location);
  if (weather) displayWeather(weather);
});

});



