const express = require("express");
const announcementRoutes = require("./routes/announcement.routes");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Announcement API is running",
  });
});

app.use("/api/announcements", announcementRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

module.exports = app;
