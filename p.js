const apikey = "ececd5c66df07f445af754f30c65842b";

const weatherData=document.getElementById('weather-data');

const cityInputEl=document.getElementById('city-input');

const formEl = document.querySelector('form');

formEl.addEventListener("submit" , (event)=>{
  event.preventDefault();
  const cityValue=cityInputEl.value;
  console.log(cityValue);
   getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

    if(!response.ok){
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    const temperature=Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details=[
      `Feels like: ${data.main.feels_like}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];
    
    weatherData.querySelector('.icon').innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="sun">`;
    

    weatherData.querySelector('.temperature').textContent = `${temperature}°C`;

    weatherData.querySelector('.description').textContent = `${description}`;

    weatherData.querySelector('.details').innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");




  } catch (error) {
    weatherData.querySelector('.icon').innerHTML = "";
    

    weatherData.querySelector('.temperature').textContent ="";

    weatherData.querySelector('.description').textContent = "An error happened , please try again later";

    weatherData.querySelector('.details').innerHTML = "";


  }
}
