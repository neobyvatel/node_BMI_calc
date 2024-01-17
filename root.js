const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bmiRoutes = require("./routes/bmiRoutes");
const fs = require("fs");
const app = express();
const port = 3000;
const bmiHistoryPath = path.join(__dirname, "data", "bmiHistory.json");

function loadBmiHistory() {
  try {
    const data = fs.readFileSync(bmiHistoryPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
function saveBmiData(data) {
  fs.writeFileSync(bmiHistoryPath, JSON.stringify(data));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/bmi", bmiRoutes);

app.post("/bmi/calculator", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res
      .status(400)
      .send("Invalid input. Please provide valid height and weight.");
  }

  const bmi = weight / Math.pow(height, 2);

  const bmiResult = {
    height: height,
    weight: weight,
    bmi: bmi.toFixed(2),
    date: new Date().toLocaleString(),
  };

  const bmiHistory = loadBmiHistory();

  bmiHistory.push(bmiResult);

  saveBmiData(bmiHistory);

  res.send(`BMI Result: ${bmi.toFixed(2)}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
