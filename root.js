const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const bmiRoutes = require("./routes/bmiRoutes");
app.use("/", bmiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
