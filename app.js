function formatDate(timestamp){
    let date = new Date(timestamp)
    let hours = date.getHours()
    if (hours < 10) { hours=
        `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10) { minutes =
        `0${minutes}`
    }
    let day = date.getDay()

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayWeek = days[day]
    console.log(hours)




    return `${dayWeek} ${hours}:${minutes}`


}


function formatDay(timestamp) {
  let date = new Date(timestamp*1000)
  let day = date.getDay()
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]


  return days[day]

}

function displayForecast(response) {
    let forecast = response.data.daily
    let forecastElement = document.querySelector("#forecast")

    let forecastHTML = `<div class="row">`

    forecast.forEach(function(forecastDay, index) {

        if (index < 6) {
            forecastHTML = forecastHTML + `
             <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="35"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div>`

                  }

    })

forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML
}






function getforecast(coordinate){
    apiKey = "34e1f851988e8ddccf3e6d99ec3613ee"

   apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`
   axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response){
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let descriptionElement = document.querySelector("#description")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")

    celciusTemperature = response.data.main.temp
    
    temperatureElement.innerHTML = Math.round(celciusTemperature)
    




    temperatureElement.innerHTML= Math.round(response.data.main.temp)
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    windElement.innerHTML = Math.round(response.data.wind.speed)
    descriptionElement.innerHTML = response.data.weather[0].description
    dateElement.innerHTML = formatDate(response.data.dt *1000)
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    iconElement.setAttribute("alt", response.data.weather[0].description);

    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name

    getforecast(response.data.coord)
    
    
}

function search(city){
    apiKey = "34e1f851988e8ddccf3e6d99ec3613ee"

apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)

}

function handleSubmit(event) {
    event.preventDefault()
    let cityinputElement = document.querySelector("#city-input")
    search(cityinputElement.value)
    
    
}

function searcLocation(position) {
    apiKey = "34e1f851988e8ddccf3e6d99ec3613ee"

 apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)

};
 
    

function getCurrentLocation(event) {
event.preventDefault()
navigator.geolocation.getCurrentPosition(searcLocation) 
}


function displayFahrenheitConversion(event) {
    event.preventDefault()

    let temperatureElement = document.querySelector("#temperature")

    fahrenheitTemperature = (celciusTemperature * 9/5) + 32

    temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
    fahrenheitValue.classList.add("active")
    

}

function displayCelciusConversion(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature)
    
}



let celciusTemperature = null

search("Lagos")


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let currentLocationElement = document.querySelector("#current-location")
currentLocationElement.addEventListener("click", getCurrentLocation)

let fahrenheitValue = document.querySelector("#fahrenheit")
fahrenheitValue.addEventListener("click", displayFahrenheitConversion)

let celciusValue = document.querySelector("#celcius")
celciusValue.addEventListener("click", displayCelciusConversion)




