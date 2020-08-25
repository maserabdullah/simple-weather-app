const path = require("path");
const express = require("express");
const request = require("request");
const hbs = require("hbs");

//importing geocode and forecast
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

let app = express();
//for heroku
const port = process.env.PORT || 3000;
//Define paths for express config
let pathToPublic = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set-up handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set-up static directory to serve
app.use(express.static(pathToPublic));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "MA",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "MA",
    message: "This help page containers FAQs",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "MA",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search",
    });
  }
  res.send({
    products: [],
  });
});

// ***********************************************************
//Getting the weather by integrating weather-app and web-server
// ***********************************************************

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address must be provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      //error in geocode
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location: location,
          forecast: forecastData,
        });
      }); // end of forecast
    }
  ); // end of geocode
}); // end of app.get("/weather")

//Help page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Oops!!",
    errorMessage: "Help article not found",
    name: "MA",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Oops!!",
    errorMessage: " Page not found!",
    name: "MA",
  });
});

app.listen(port, () => console.log("Server started"));
