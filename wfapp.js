const apiKey = "a921e948ba90163e255a5b29ae365c00";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")) {
      weatherIcon.src = "clouds.png";
    } else if (weatherMain.includes("clear")) {
      weatherIcon.src = "clear.png";
    } else if (weatherMain.includes("rain")) {
      weatherIcon.src = "rain.png";
    } else if (weatherMain.includes("drizzle")) {
      weatherIcon.src = "drizzle.png";
    } else if (weatherMain.includes("mist")) {
      weatherIcon.src = "mist.png";
    } else {
      weatherIcon.src = "default.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
