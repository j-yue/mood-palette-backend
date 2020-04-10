const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const KEY = process.env.UNSPLASH_KEY;
const ENDPT = "https://api.unsplash.com/search/photos?page=1&query=";

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
      res.send(response.data);
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

app.use(
  cors({
    origin: "https://mood-colors.herokuapp.com/",
    methods: "GET",
  })
);

app.listen(port, () => {
  console.log("Express server listening on port", port);
});

// var allowedOrigins = ["http://localhost:8081", "http://yourapp.com"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// app.listen(process.env.PORT || 8000);
