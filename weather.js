/*
 * This file uses the Current Weather API - Open Weather Map (https://openweathermap.org/current)
 * to get the current weather info for the coordinates passed to it and prints the results to the terminal
 * 
 * 
*/

// Require http
const https = require('https');
const http = require('http');
const api = require('./api.json');

/**
 * Prints weather info on the city returned by Geocoding API
 * @param {Object} weather - All weather info for the city
 * @param {String} cityName - Name of the city the user searched
 */
function printData (weather, cityName) {
  // console.log(cityName, weather);    // FOR TESTS ONLY

  console.log(`\nCurrent weather info for ${cityName} (${weather.name}), country ${weather.sys.country} is:
  - main: ${weather.weather[0].main} - ${weather.weather[0].description};
  - clouds: ${weather.clouds.all} %;
  - temperature: ${weather.main.temp} °C;
    - feels like: ${weather.main.feels_like} °C
    - temp. min: ${weather.main.temp_min} °C
    - temp. max: ${weather.main.temp_max} °C
  - wind: ${weather.wind.speed} m/s;
  - humidity: ${weather.main.humidity} %;
  - pressure: ${weather.main.pressure} hPa;`);
}

/**
 * 
 * @param {Number} lat - Latitude of the city's position
 * @param {Number} lon - Longitude of the city's position
 * @param {String} cityName - Name of the city the user searched
 */
function getWeather (lat, lon, cityName) {
  try {
    let url = new URL('https://api.openweathermap.org/data/2.5/weather?');

    const parameters = {
      appID: api.key,
      units: 'metric',
      lat: lat,
      lon: lon
    };

    // For every key/value pair in 'parameters' Object, add the pair to the query
    for (let property in parameters) {
      url.searchParams.append(property, parameters[property]);
    }

    // console.log(url);   // FOR TESTS ONLY

    // Connect to the API URL
    const req = https.get(url, res => {
      if (res.statusCode === 200) {

        // This will hold the response
        let body = '';

        // Collect all data from buffer (stream) and store it into variable body as a string
        res.on('data', data => {
          body += data.toString();
        });

        // When the response is received, and stream ended
        res.on('end', () => {
          try {
            // Parse the data
            const weather = JSON.parse(body);
            // Print the data
            printData(weather, cityName);
          } catch (error) {
            console.error(error.message);
          }
        });
      } else {
        // If status code !== 200
        const message = `There was a problem getting the weather info for ${cityName} Latitude: ${lat}, Longitude: ${lon} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;
        const statusCodeError = new Error(message);
        console.error(statusCodeError);
      }
      req.on('error', error => console.error(error.message));
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.getWeather = getWeather;
