var express = require("express");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/news", function(req, res) {
  res.sendFile(path.join(__dirname + "/news.html"));
});

app.get("/helpline", function(req, res) {
  res.sendFile(path.join(__dirname + "/helpline.html"));
});

app.get("/faq", function(req, res) {
  res.sendFile(path.join(__dirname + "/faq.html"));
});

app.listen(PORT, function() {
  console.log("Successfully started!");
});
