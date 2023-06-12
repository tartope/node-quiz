const express = require("express");
const path = require("path");
const PORT = 8080;
const cors = require("cors");
const { pool } = require('./dbConnection')

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

const app = express();
// parses JSON from incoming request
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Do not edit
const options = {
  lemon: "yellow",
  lime: "limegreen",
  tangerine: "orange",
  grapefruit: "lightcoral",
};

// #3 helper function 'getColor`
const getColor = (fruit) => {
  // console.log(options)
  return options.fruit
};

// #1 serve the colors.html page when /colors is visited
// DO NOT USE express.static
app.get("/colors", cors(corsOptions), (req, res) => {
  const ABSOLUTE_PATH = path.join(__dirname, "./client/colors.html");
  res.status(200).sendFile(ABSOLUTE_PATH);
});

// #2 & #4 handle POST requests to /colors
app.post("/colors", cors(corsOptions), async (req, res) => {
  const { fruit } = req.body;
  const [addColor] = await pool.query("insert into cars (fruit) values (?)", [fruit])
  res.send(addColor)
});

// #6 serve styles.css - DO NOT use express.static()
app.get("/styles.css", () => {});

// #5 Update functionality to database
app.put("/colors/:id/:fruit", cors(corsOptions), () => {
  const carId = req.params['car_id']
  const fruit = req.params['fruit']
  const updateCarColor = await pool.query("update car set color = ? where car_id = ?", [car_id])
});

// #7 unknown routes - 404 handler
// research what route to serve this for
app.get("", () => {});

// Global error handling middleware
// You can leave this alone
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
