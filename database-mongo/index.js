var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
});

var itemSchema = mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

var Item = mongoose.model("Item", itemSchema);

var selectAll = function (callback) {
  Item.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var add = function (data, callback) {
  Item.create(data, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var del = function (id, callback) {
  Item.deleteOne({ _id: id }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var up = function (id, obj, callback) {
  Item.updateOne({ _id: id }, obj, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
module.exports.selectAll = selectAll;
module.exports.add = add;
module.exports.del = del;
module.exports.up = up;
