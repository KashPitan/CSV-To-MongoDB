const csvFilePath = "data/test_data_1.csv";
const csvFilePath2 = "data/test_data_original.csv";

const csv = require("csvtojson");
const Track = require("../Models/Track");
const Contract = require("../Models/Contract");
const mongoose = require("mongoose");
const csvtodb = require("../functions/trackcsvtodb");

describe("TEST GROUP: READING CSVS", function () {
  let contract;
  beforeEach((done) => {
    let _id = mongoose.Types.ObjectId();
    contract = new Contract({
      _id: _id,
      Name: "Contract 1",
    });
    contract
      .save()
      .then((contract) => {
        done();
      })
      .catch((err) => {
        done();
        // console.log(err);
      });
  });

  it("TEST #1: load a csv (original file)", async () => {
    let errors = await csvtodb(csvFilePath2);
    // console.log("Errors:", errors);
  });

  it("TEST #2: file with all valid csv lines", async () => {
    let errors = await csvtodb(csvFilePath);
    // console.log("Errors:", errors);
  });

  it("TEST #3: file with all invalid csv lines", async () => {
    let errors = await csvtodb(csvFilePath);
    // console.log("Errors:", errors);
  });
});
