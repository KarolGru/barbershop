const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3999;
const fs = require("fs");
app.use(express.json());
app.use(cors());

app.post("/barber", (req, res) => {
  const data = fs.readFileSync("date.json", "utf-8");
  let parsed = JSON.parse(data);

  parsed.push(req.body);
  const string = JSON.stringify(parsed);
  fs.writeFileSync("date.json", string);
  res.status(200).end();
});

app.get("/barber", (req, res) => {
  const data = fs.readFileSync("date.json", "utf-8");

  let parse = JSON.parse(data);
  if (data.length !== 0) {
    res.json(parse);
    res.status(200).end();
  }
  res.json(parse);
  res.status(200).end();
});

app.listen(PORT);
