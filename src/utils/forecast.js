const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9de12a1b548949e5f7a84b94f549cec8&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to access weather details`, undefined);
    } else if (body.error) {
      callback(`Unable to find the location`, undefined);
    } else {
      callback(
        undefined,
        `The temparature is ${body.current.temperature}℃ and here it feels like ${body.current.feelslike}℃. The weather is ${body.current.weather_descriptions[0]}.`
      );
    }
  });
};

module.exports = forecast;
