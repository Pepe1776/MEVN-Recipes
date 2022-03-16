const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parsing request app/json
app.use(express.json());
// parse requests app/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simp route
app.get("/", (req, res) => {
    res.json({ message: "welcome to J Parkers App backend" });
});
// include routes
require("./routes/recipe.routes")(app);
// set port to listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});