const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

//allow only client to make api calls
const corsOptions = { origin: process.env.CLIENT };
app.use(cors(corsOptions));

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = process.env.ENDPT;

app.get("/", (req, res) => {
  res.send("Mood colors api running");
});

app.get("/:search", (req, res) => {
  const search = req.params.search;
  const url = `${ENDPT + search}&client_id=${KEY}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/triggerDownload/:download", (req, res) => {
  const url = `${download}?client_id=${KEY}`;
  axios
    .get(url)
    .then((response) => res.send(response.data))
    .catch((e) => console.log(e));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
