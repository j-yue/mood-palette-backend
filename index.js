const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = "https://api.unsplash.com/search/photos?page=1&query=";

const cors = require("cors");
const corsOptions = { origin: "https://moodpalette.netlify.app/" };
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
  } else res.send("You are not authorized to use this api");
});

app.get("/triggerDownload/:id", (req, res) => {
  if (checkOrigin(req)) {
    const url = `https://api.unsplash.com/photos/${req.params.id}/download?client_id=${KEY}`;
    axios
      .get(url)
      .then(() => res.send("Triggered download successfully."))
      .catch((e) => console.log(e));
  } else res.send("Unable to trigger download");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
