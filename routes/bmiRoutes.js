const express = require("express");
const router = express.Router();
const path = require("path");
const bmiHistoryPath = path.join(__dirname, "..", "data", "bmiHistory.json");
function loadBmiHistory() {
  try {
    const data = fs.readFileSync(bmiHistoryPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
router.get("/calculator", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "bmiCalculator.html"));
});

router.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "history.html"));
});

module.exports = router;
