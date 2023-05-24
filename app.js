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

function displayTemperature(response){
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let descriptionElement = document.querySelector("#description")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")
    




    temperatureElement.innerHTML= Math.round(response.data.main.temp)
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    windElement.innerHTML = Math.round(response.data.wind.speed)
    descriptionElement.innerHTML = response.data.weather[0].description
    dateElement.innerHTML = formatDate(response.data.dt *1000)
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    iconElement.setAttribute("alt", response.data.weather[0].description);

    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name
    
    
}

function search(city){
    apiKey = "6ce66d083b4d6dddb74ba02266495c46"

apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)

}

function handleSubmit(event) {
    event.preventDefault()
    let cityinputElement = document.querySelector("#city-input")
    search(cityinputElement.value)
    
    
}

function searcLocation(position) {
    apiKey = "6ce66d083b4d6dddb74ba02266495c46"

 apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)

};
 
    

function getCurrentLocation(event) {
event.preventDefault()
navigator.geolocation.getCurrentPosition(searcLocation) 
}




let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let currentLocationElement = document.querySelector("#current-location")
currentLocationElement.addEventListener("click", getCurrentLocation)

search("Lagos")