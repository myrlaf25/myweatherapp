//Key into the server
var api_key = "b709b8b1255dbfd93b409d2ca2ece655"
var historyEl=document.querySelector("#history");
var weatherHistory=JSON.parse(localStorage.getItem("city-name")) || [];
console.log(weatherHistory);


//function takes city name and retrieves weather data for that city
function getWeather(city){

    var currentWeatherUrl= `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


//send fetch request to get latitude and longitude
fetch(currentWeatherUrl)
.then((data)=>data.json())
.then(function (weather){
    console.log(weather);

if(weather.cod === "404") {
    alert("City not found");
    return;
}
var lat = weather.coord.lat;
var lon= weather.coord.lon;

//api call for the latitude and longitude
var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}`;
fetch(onecallURL)
.then((data) => data.json()
.then(function (onecallData){
    console.log(onecallData);
}));

});


var currentDate= new Date();
console.log(currentDate.toDateString());

var currentTemperature= document.querySelector("#temp");
var currentHumidity= document.querySelector("#humidity");
var currentUvi=document.querySelector("#uvi");
var currentCity=document.querySelector("#currentCity");

currentCity.innerHTML= "hello " + currentDate; 

function getFahrenheit(K) {
    return Math.floor((K - 273.15) *1.8 +32);
}
currentTemperature.innerHTML = " Temperature: " + getFahrenheit(oncecallData.main.temp);
var addCity= document.querySelector("#add-city") 
}

// var search=document.addEventListener("click", function (e) {
//     e.preventDefault();
//     if(!e.target.matches("city-name")) return;

//     var city= e.target.textContent;

        //   getWeather(city);
        // });


getWeather("phoenix");

