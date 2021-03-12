//Key into the server
var api_key = "b709b8b1255dbfd93b409d2ca2ece655";
var historyEl = document.querySelector("#history");
var inputEl = document.querySelector("#city-name");
var currentCity = document.querySelector("#currentCity");
var searchedCities= document.querySelector("#searchedCities");

function renderSearchedCities(){
    searchedCities.innerHTML="";
    for(i=0; i< weatherHistory.length; i++){
        var searchedEl = document.createElement('p');
        searchedEl.textContent=weatherHistory[i];
        searchedCities.append(searchedEl)
        
    }


}



function getFahrenheit(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}
//function takes city name and retrieves weather data for that city
function getWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  //send fetch request to get latitude and longitude
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);

      if (weather.cod === "404") {
        alert("City not found");
        return;
      }

      currentCity.innerHTML = "" + weather.name;

      var lat = weather.coord.lat;
      var lon = weather.coord.lon;

      //api call for the latitude and longitude
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (onecallData) {
          console.log(onecallData);
          buildDashboard(onecallData);
        });
    });
    
    function buildDashboard(data) {
        var currentDate = new Date(data.current.dt * 1000);
        console.log(currentDate);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        
        var currentTemperature = document.querySelector("#temp");
  var currentHumidity = document.querySelector("#humidity");
  var currentUvi = document.querySelector("#uvi");
  
  var searchBtn = document.querySelector("#searchBtn");
  var clearHistoryBtn = document.querySelector("#clearHistoryBtn");
  
  currentCity.innerHTML += " (" + month + "/" + day + "/" + year + ") ";
  
  currentTemperature.innerHTML =
  "Temperature: " + getFahrenheit(data.current.temp) + " F";
  currentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
  currentUvi.innerHTML = "UV Index: " + data.current.uvi;
  
  var cityForecast=document.querySelector("#forecast");
  
  
  
  
  cityForecast.innerHTML="";
  
  for(i=0; i< 5; i++){
      var forecastIndex = data.daily[i];  
      console.log(forecastIndex);
      cityForecast.append(buildForecast(forecastIndex))
    }
    
    function buildForecast(forecast){
        
        var col =document.createElement("div");
        col.classList.add("col");
        
        var forecastContainer =document.createElement("div");
        forecastContainer.classList.add("big-primary", "rounded", "p-5");
        
        // var img = document.createElement("img");
        // img.setAttribute("src", forecast.url);
        
        
        
        
        
        var forecastDate = new Date(data.daily[i].dt*1000);
        console.log(forecastDate);
        var forecastDay = forecastDate.getDate();
        var forecastMonth = forecastDate.getMonth() + 1;
        var forecastYear = forecastDate.getFullYear();
        var forecastDate=document.createElement("h4");
        forecastDate.textContent= forecast.forecastDate;
        
        // forecast.setAttribute();
        forecastDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
      
        
        
        
        
        
        var forecastTemp = document.createElement("p");
        //   temp.textContent= forecast.temp;
        forecastTemp.innerHTML = "Temp: " + getFahrenheit(data.daily[i].temp.day)  + " F";
        console.log(data.daily[i].temp);
        console.log(getFahrenheit(data.daily[i].temp.day));
        
        
        
              
        var forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = "Humidity: " + (data.daily[i].humidity) + "%";
        
        
        
        forecastContainer.append(forecastDate, forecastTemp, forecastHumidity);
        
        // col.innerHTML="";

        col.append(forecastContainer);
        
        return col;
        
        
    }
    }             
}

// }
var weatherHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(weatherHistory);

renderSearchedCities();


searchBtn.addEventListener("click", function (e) {
  var searchCity = inputEl.value;
  getWeather(searchCity);
  weatherHistory.push(searchCity);
  
  renderSearchedCities();


  localStorage.setItem("search", JSON.stringify(weatherHistory));
  
});

clearHistoryBtn.addEventListener("click", function(){
    localStorage.clear();
    weatherHistory=[];
    searchedCities.innerHTML="";

}) 
// getWeather("");


