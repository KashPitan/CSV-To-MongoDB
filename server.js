const Express = require("express");
const mongoose = require("mongoose");
const csvpath = "./data/test_data_1.csv";
const csvtodb = require("./functions/trackcsvtodb");
const Track = require("./Models/Track");
const Contract = require("./Models/Contract");

//sets up express app
const App = Express();

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose
  .connect("mongodb://localhost:27017/practice", MongoOptions)
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful");
  });

// let _id = mongoose.Types.ObjectId();
// contract = new Contract({
//   _id: _id,
//   Name: "Contract 1",
// });

//comment out this initial operation to prevent duplicate contracts being created
// contract.save().catch((err) => {
//   done();
//   console.log(err);
// });

csvtodb(csvpath);
