const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = "https://api.unsplash.com/search/photos?page=1&query=";

const corsOptions = { origin: "https://mood-colors.herokuapp.com" };

app.use(cors(corsOptions));

const checkOrigin = (req) => {
  return req.headers.origin == corsOptions.origin;
};

app.get("/", (req, res) => {
  if (checkOrigin(req)) res.send("Mood colors API running");
  else res.send("Unauthorized");
});

app.get("/:search", (req, res) => {
  if (checkOrigin(req)) {
    const search = req.params.search;
    const url = `${ENDPT + search}&client_id=${KEY}`;
    axios
      .get(url)
      .then((response) => {
        res.send(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  } else
    res.send(
      `your origin is ${req.headers.origin} and the origin we are checking for is ${corsOptions.origin}`
    );
});

app.get("/triggerDownload/:download", (req, res) => {
  if (checkOrigin(req)) {
    const url = `${download}?client_id=${KEY}`;
    axios
      .get(url)
      .then((response) => res.send(response.data))
      .catch((e) => console.log(e));
  } else res.send("Unauthorized");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
