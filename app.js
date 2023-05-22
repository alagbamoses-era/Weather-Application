function displayTemperature(response){
    console.log(response.data.main.temp)
}

apiKey = "6ce66d083b4d6dddb74ba02266495c46"

city = "London"
apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)