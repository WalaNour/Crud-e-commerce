var express = require("express");
var bodyParser = require("body-parser");
var db = require("../database-mongo");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/items", function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post("/add", (req, res) => {
  db.add(req.body, (err, data) => {
    res.send({ msg: "succ" });
  });
});

app.delete("/delete/:id", (req, res) => {
  db.del(req.params.id, (err, data) => {
    res.send({ msg: "succ" });
  });
});

app.put("/up/:id", (req, res) => {
  db.up(req.params.id, req.body, (err, data) => {
    res.send({ msg: "succ" });
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
