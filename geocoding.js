/*
 * This file uses the Geocoding API - Open Weather Map (https://openweathermap.org/api/geocoding-api)
 * to get a maximum of 5 cities with the desired name.
 * The API returns coordinates (lat, lon) for each city, then using theese coordinates, calls the 
 * Current Weather API - Open Weather Map (https://openweathermap.org/current)
 * 
 * NOTE: The 5 cities limit is imposed by the API, and is not the dev's choice.
*/

// Require http
const https = require('https');
const http = require('http');
const api = require('./api.json');
const weather = require('./weather.js');

/**
 * FOR TESTS ONLY - Print to the terminal info on every city found.
 * @param {Array} cities - Array of found citites.
 */
function printData (cities, zipSearch) {
  let coords = [];
  // console.log(cities, '\n');   // FOR TESTS ONLY
  console.log('Cities found:');

  if (!zipSearch) {
    // If search is made by city name
    for (let i = 0; i < cities.length; i++) {
      console.log(`${i + 1}. City '${cities[i].name}'\tcountry: ${cities[i].country}\tstate ${cities[i].state}\tLatitude: ${cities[i].lat}\tLongitude: ${cities[i].lon}`);
    }

    for (let i = 0; i < cities.length; i++) {
      coords.push(`${cities[i].lat} ${cities[i].lon}`);
    }
  } else {
    // If search is made by zip code
    console.log(`City '${cities.name}'\tcountry: ${cities.country}\tstate ${cities.state}\tLatitude: ${cities.lat}\tLongitude: ${cities.lon}`);
    coords.push(`${cities.lat} ${cities.lon}`);
  }

  console.log('\n', coords);
}

/**
 * Checks whether the user input contains a number or not.
 * If the input contains a number (e.g. E14 or 90201), it will be considered a zip code.
 * @param {string} input - Users input (parameters from the terminal).
 * @returns TRUE if input contains number, FASLE otherwise.
 */
function containsNumber (input) {
  return /\d/.test(input);
}

function getCities (info) {
  try {
    let url;
    let zipSearch;

    // This holds the search parameters
    const parameters = {
      appID: api.key,
      limit: 5
    };

    // Decide whether the user searched by city name or by zip code and add the correpsonding parameter.
    if (containsNumber(info)) {
      // Search by zip code
      zipSearch = true;
      parameters.zip = info;
      url = new URL(`https://api.openweathermap.org/geo/1.0/zip?`);
    } else {
      // Search by city name
      zipSearch = false;
      parameters.q = info;
      url = new URL(`https://api.openweathermap.org/geo/1.0/direct?`);
    }

    // For every key/value pair in 'parameters' Object, add the pair to the query
    for (let property in parameters) {
      url.searchParams.append(property, parameters[property]);
    }

    // console.log(url);  // -- FOR TESTS ONLY

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
            const cities = JSON.parse(body);
            // Print the data
            printData(cities, zipSearch);   // FOR TESTS ONLY






            if (!zipSearch) {
              // If search is made by city name
              // For every set of coordinates, get weather data
              for (let i = 0; i < cities.length; i++) {
                // console.log(cities[i].lat, cities[i].lon, cities[i].name);   // FOR TESTS ONLY
                weather.getWeather(cities[i].lat, cities[i].lon, cities[i].name);
              }
            } else {
              // If search is made by zip code
              // console.log(`cities.lat, cities.lon, cities.name`);   // FOR TESTS ONLY
              weather.getWeather(cities.lat, cities.lon, cities.name);
            }














          } catch (error) {
            console.error(error.message);
          }
        });
      } else {
        // If status code !== 200
        const message = `There was a problem getting the weather info for ${info} (${res.statusCode} - ${http.STATUS_CODES[res.statusCode]})`;
        const statusCodeError = new Error(message);
        console.error(statusCodeError);
      }
      req.on('error', error => console.error(error.message));
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Export getCities method
module.exports.getCities = getCities;