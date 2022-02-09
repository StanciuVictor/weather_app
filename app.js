/*
 * This app uses the Open Weather Map API (https://openweathermap.org/api/geocoding-api)
 * to get the current weather in the desired city or location.
 * 
 * Works best with city names (rather then zip codes)
 * 
 * NOTE:  If there are multiple cities with the same name, the app will display the current
 * weather in a maximum of 5 cities.
 *        The 5 cities limit is imposed by the API, and is not the dev's choice.
 * 
 * Use node.js to run this app:
 * node app.js {city name}[, {state code - US only}, {country code - ISO 3166}]
 * e.g. node app.js Los Angeles, CA, US
 *      node app.js London, GB
 * 
 * NOTE: For US cities, if you choose to use the state code, then you must use the country code aswell
 * e.g. node app.js Los Angeles, US       // OK
 *      node app.js Los Angeles, CA, US   // OK
 *      node app.js Los Angeles, CA       // NOT OK
 * 
*/

const geocoding = require('./geocoding.js');

const info = process.argv.slice(2).join(' ');
geocoding.getCities(info);