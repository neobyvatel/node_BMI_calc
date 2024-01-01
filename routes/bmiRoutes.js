const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/../views/bmiCalculator.html");
});

router.post("/bmicalculator", (req, res) => {
  const height = Number(req.body.height) / 100;
  const weight = Number(req.body.weight);

  const BMIresult = weight / (height * height);

  if (isNaN(BMIresult)) {
    res.send("Please enter valid values");
  } else {
    let message = "";

    if (BMIresult < 18.5) {
      message = "Underweight";
    } else if (BMIresult < 24.9) {
      message = "Normal weight";
    } else if (BMIresult < 29.9) {
      message = "Overweight";
    } else {
      message = "Obese";
    }

    res.send(`Your BMI is ${BMIresult.toFixed(2)} and you are ${message}`);
  }
});

module.exports = router;
