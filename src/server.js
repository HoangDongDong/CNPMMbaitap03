const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./src/config/database");
const User = require("./src/models/user");
const apiRoutes = require("./src/routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BaiTap03 API" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// API Routes
app.use("/api/users", apiRoutes);

// Sync database and start server
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
