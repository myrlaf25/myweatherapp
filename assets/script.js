//Key into the server
var api_key = "b709b8b1255dbfd93b409d2ca2ece655"

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
}

getWeather("tucson");

search.addEventListener("submit', function(e){
e.preventDefault()
})
var city= document.querySelector(".form-control").value
var form= document.querySelector("search")