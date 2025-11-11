const city = "kurunegala";
const apiKey = "99575a0e1d272a935419ec995e6990bd";

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const weatherIcon = document.getElementById("weather-icon");

    const data = await response.json();
    if (data.cod == 200) {
      document.getElementById("city").innerText = `${city}`;
      document.getElementById("temp").innerText = `${Math.trunc(
        data.main.temp
      )}°C`;
      document.getElementById("humidity").innerText = `${data.main.humidity}%`;
      document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

      //set weather icon
      const iconText = data.weather[0].main;
      if (iconText === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (iconText === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (iconText === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (iconText === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (iconText === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (iconText === "Snow") {
        weatherIcon.src = "images/snow.png";
      }

      document.getElementById("weather-details").style.display = "flex";
    } else {
      document.getElementById("error").innerText = "City not found";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.getElementById("search").addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput").value;
  getWeather(cityInput);
});
