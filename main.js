/**
 * Instagram OAuth Exercise
 * ====
 *
 * See the README.md for instructions
 */

(function() {
  var forecastBasUrl = 'https://crossorigin.me/https://api.forecast.io/forecast/'// <YOUR-API-KEY-HERE : forecast/yourAPIkey>

  var instagramBasUrl = 'https://crossorigin.me/https://api.instagram.com/v1/users/self/media/recent/?access_token='
  var container = document.querySelector('#container')
  var state = {
    image: "",
    weather: ""
   
  }

  var tokenString = window.location.hash
  var cutToken = tokenString.slice(14, tokenString.length);
  var instagramCombined = instagramBasUrl + cutToken



  if (!cutToken) {
    console.log("You aren't logged in...")
    renderLogin(state, container)
    // render your login button without the image...

  } else {
    console.log("You have a token!")

    fetch(instagramCombined)

    .then((response)=>{
      return response.json()
    })
    .then((dataAsJson)=>{
      state.image = dataAsJson.data[0].images.standard_resolution.url
      var longitude = ","+ dataAsJson.data[0].location.longitude
      var latitude = dataAsJson.data[0].location.latitude
      var time = "," + dataAsJson.data[0].created_time
      renderImages(state, container)

      console.log("This is time from photo:" + time)

      var weatherCombined = forecastBasUrl + latitude + longitude + time

      fetch(weatherCombined)
      .then((response)=>{
        return response.json()
      })
      .then((weatherResponse)=>{
        state.weather = weatherResponse.currently.summary
        renderWeather(state, container)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
  
    
    .catch ((err)=>{
       console.log(err)
    })


    // TODO: Make your fetch calls here
  }

  function renderLogin(data, into) {
    into.innerHTML = '<h2>What was the weather from your last shot!</h2>'
    // insert your API key below
    into.innerHTML += '<form action="https://api.instagram.com/oauth/authorize/?client_id=<YOUR-API-KEY-HERE>&redirect_uri=http://localhost:3000&response_type=token" method="post">     <button type="submit">Login to Instagram</button>    </form>'

  }

  function renderImages(data, into) {
    into.innerHTML = "<h2>Here's the weather during this shot!</h2>"
    into.innerHTML += '<img src=' + data.image + '/>'
  }

  function renderWeather(data, into) {
    into.innerHTML += '<h2>' + data.weather + '</h2>'
  }

 
})()


 