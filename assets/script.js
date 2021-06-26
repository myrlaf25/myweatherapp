//Key into the server
var api_key = "b709b8b1255dbfd93b409d2ca2ece655";
//variables to pull from the HTML ids
var historyEl = document.querySelector("#history");
var inputEl = document.querySelector("#city-name");
var currentCity = document.querySelector("#currentCity");
var searchedCities= document.querySelector("#searchedCities");

searchedCities.addEventListener("click", function(e){
    if (!e.target.matches("p")) {
      return
    }
    var cityName = e.target.textContent;
    getWeather(cityName);
  });



//this function is to show the cities the used has been searching for 
function renderSearchedCities(){
    searchedCities.innerHTML="";
    for(i=0; i< weatherHistory.length; i++){
        var searchedEl = document.createElement('p');
        searchedEl.textContent=weatherHistory[i];
        searchedCities.append(searchedEl)
        
    }


}


//this function is to convert the temperature the api is providing in kelvin to change to fahrenheit
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
//if the city cannot be found it will alert with a window pop up to the user it may not be found
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
//thsi helped fix a bow of duplication
      currentCity.innerHTML = "" + weather.name;
//create variables to pull the  latitue and longitude from the api info provided
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
    //this function is to get teh current date, temperature, humidity, and UV
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
  
  currentCity.innerHTML += " " + month + "/" + day + "/" + year + " ";
  currentTemperature.innerHTML =
  "Temperature: " + getFahrenheit(data.current.temp) + " F";
  currentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";

  currentUvi.innerHTML = "UV Index: " + data.current.uvi;
  
  // uviIndex = document.getElementById('range');
  
  function findUviIndex (uviIndex){
    var uviIndex=data.current.uvi;
    console.log(uviIndex)
    
    if(uviIndex <= 2.00) {
      document.getElementById('range').innerHTML='Index is Low.';
    } else if (uviIndex >=3.00 && uviIndex <=5.00){
      document.getElementById('range').innerHTML='Index is Moderate.';
    } else {
      document.getElementById('range').innerHTML='Index is High.';
    }
  }
  findUviIndex();

  let icon = data.current.weather[0].icon;
 var currentIcon = document.createElement('img');

console.log(icon);
 currentIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');





  var cityForecast=document.querySelector("#forecast");
  
  
  
  //this prevents duplication in the for loop when displaying the 5 day forecast
  cityForecast.innerHTML="";
  // thsi is a for loop to pull the array info from the one provided from the api up to index 5
  for(i=1; i < 6; i++){
      var forecastIndex = data.daily[i];  
      console.log(forecastIndex);
      cityForecast.append(buildForecast(forecastIndex))
    }
    //this function is to get teh 5 day forecast for the city in the search input
    function buildForecast(forecast){
        
        var col =document.createElement("div");
        col.classList.add("col");
        
        var forecastContainer =document.createElement("div");
        forecastContainer.classList.add("big-primary", "rounded", "p-5");
        //if I have time I will try to pull an icon for the weather display
        // var img = document.createElement("img");
        // img.setAttribute("src", forecast.url);
        
        
        
        
        
        var forecastDate = new Date(data.daily[i].dt*1000);
        console.log(forecastDate);
        var forecastDay = forecastDate.getDate();
        var forecastMonth = forecastDate.getMonth() + 1;
        var forecastYear = forecastDate.getFullYear();
        var forecastDate=document.createElement("h4");
        forecastDate.textContent= forecast.forecastDate;
        
       
        forecastDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
      
        
        
        
        
        
        var forecastTemp = document.createElement("p");
       
        forecastTemp.innerHTML = "Temp: " + getFahrenheit(data.daily[i].temp.day)  + " F";
        console.log(data.daily[i].temp);
        console.log(getFahrenheit(data.daily[i].temp.day));
        
        
        
              
        var forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = "Humidity: " + (data.daily[i].humidity) + "%";
        
        forecastContainer.append(forecastDate, forecastTemp, forecastHumidity);
        
       

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



