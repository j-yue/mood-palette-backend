const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = "https://api.unsplash.com/search/photos?page=1&query=";

const corsOptions = { origin: "https://mood-colors.herokuapp.com" };

app.use(cors(corsOptions));

const checkHost = (host) => {
  return host == "mood-colors.herokuapp";
};

app.get("/", (req, res) => {
  if (checkHost(req.hostname)) res.send("Mood colors API running");
  else res.send("Your hostnmae is " + req.hostname);
});

app.get("/:search", (req, res) => {
  if (checkHost(req.hostname)) {
    const search = req.params.search;
    const url = `${ENDPT + search}&client_id=${KEY}`;
    console.log(req.hostname);
    axios
      .get(url)
      .then((response) => {
        res.send(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  } else res.send("Your host is " + req.get("host"));
});

app.get("/triggerDownload/:download", (req, res) => {
  if (checkHost(req.hostname)) {
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
