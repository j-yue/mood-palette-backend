const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = "https://api.unsplash.com/search/photos?page=1&query=";

const cors = require("cors");
app.use(cors({ origin: "https://mood-colors.herokuapp.com" }));

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

//https://api.unsplash.com/photos/LBI7cgq3pbM/download

app.get("/triggerDownload/:id", cors(corsOptions), (req, res) => {
  if (checkOrigin(req)) {
    // const url = `${download}?client_id=${KEY}`;
    const url = `https://api.unsplash.com/photos/${req.params.id}/download&client_id=${KEY}`;
    axios
      .get(url)
      .then(() => res.send("done"))
      .catch((e) => console.log(e));
  } else res.send(`the url is ${url}`);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
