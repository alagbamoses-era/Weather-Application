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
    console.log(response.data.weather[0].icon)
}

apiKey = "6ce66d083b4d6dddb74ba02266495c46"

city = "London"
apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)