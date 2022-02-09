# Weather APP

## app.js

This app uses the Open Weather Map API (https://openweathermap.org/api/geocoding-api) to get the current weather in the desired city or location. Works best with city names (rather then zip codes)

**_NOTE:_** If there are multiple cities with the same name, the app will display the current
weather in a maximum of 5 cities. The 5 cities limit is imposed by the API, and is not the dev's choice.

Use node.js to run this app:

```js
node app.js {city name}[, {state code - US only}, {country code - ISO 3166}]
node app.js {zip code}[, {country code - ISO 3166}]
```

```js
node app.js Los Angeles, CA, US
node app.js London, GB
node app.js 90210
node app.js 90210, US
```

**_NOTE_:** For US cities, if you choose to use the state code, then you must use the country code aswell

```js
node app.js Los Angeles, US       // OK
node app.js Los Angeles, CA, US   // OK
node app.js Los Angeles, CA       // NOT OK
```

## geocoding.js

This file uses the [Geocoding API - Open Weather Map](https://openweathermap.org/api/geocoding-api) to get a maximum of 5 cities with the desired name.

The API returns coordinates `(lat, lon)` for each city, then using theese coordinates, calls the
[Current Weather API - Open Weather Map](https://openweathermap.org/current).

## weather.js

This file uses the [Current Weather API - Open Weather Map](https://openweathermap.org/current) to get the current weather info for the coordinates passed to it and prints the results to the terminal.
