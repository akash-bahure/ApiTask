const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Database Connection and Sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL!");

    // Sync all models
    await sequelize.sync({ force: false }); // Set `force: true` to reset tables
    console.log("Database synced!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
})();

// Routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/forgot-password", require("./routes/forgotPassword"));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
