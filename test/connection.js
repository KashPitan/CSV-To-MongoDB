const mongoose = require("mongoose");
var mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

before(function (done) {
  //create test database separate from working database
  mongoose.connect("mongodb://localhost:27017/curve-test", mongoOptions);
  //open connection to database
  mongoose.connection
    .once("open", function () {
      console.log("connection made");
      done();
    })
    .on("error", function (err) {
      console.log("Connection Error: " + err);
    });
});

//clear collections before each set of tests
beforeEach(function (done) {
  mongoose.connection.collections.contracts.drop(function () {
    console.log("Contracts collection has been dropped");
  });

  mongoose.connection.collections.tracks.drop(function () {
    console.log("Tracks collection has been dropped");
    done();
  });
});

after(function (done) {
  console.log("After hook");
  mongoose.disconnect();
  done();
});
