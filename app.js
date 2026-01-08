const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-db",     // IMPORTANT: container name
  user: "root",
  password: "root",
  database: "dockerdemo"
});

db.connect(err => {
  if (err) {
    console.log("DB Connection Failed", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Docker Web App Connected to MySQL 🚀");
});

app.post("/save", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO users(name) VALUES(?)", [name], () => {
    res.send("Data saved");
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
