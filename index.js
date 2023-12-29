const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const height = Number(req.body.height) / 100;
  const weight = Number(req.body.weight);
  const BMIresult = weight / (height * height);
  if (isNaN(BMIresult)) res.send("Please enter valid values");
  else {
    let message = "";
    if (BMIresult < 18.5) {
      message = "Underweight";
    } else if (BMIresult >= 18.5 && BMIresult < 24.9) {
      message = "Normal weight";
    } else if (BMIresult >= 25 && BMIresult < 29.9) {
      message = "Overweight";
    } else {
      message = "Obese";
    }

    res.send(`Your BMI is ${BMIresult.toFixed(2)} and you are ${message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
