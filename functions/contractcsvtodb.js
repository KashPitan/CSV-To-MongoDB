//intended for ingesting contracts from a csv into a database

// const csvFilePath = "data/test_data_1.csv";
const csv = require("csvtojson");
const Track = require("../Models/Track");
const Contract = require("../Models/Contract");
const mongoose = require("mongoose");

parseCSV = async (path) => {
  if (path === null) return;

  //parse csv into jsonObject array
  let jsonObj = await csv()
    .fromFile(path)
    .subscribe((json, index) => {
      //validation,errors and writing into database
      return new Promise(async (resolve, reject) => {});
    });

  return errors;
};

writeIntoDatabase = async (contractInput, index) => {
  if (contractInput === null) return;
  try {
    await contractInput.save().then((contract) => {
      console.log("writing: " + contract);
    });
  } catch (err) {
    let errorMessages = err.message.split(",");
    errors.push({ lineNumber: index, errors: errorMessages });
  }
};

module.exports = parseCSV;
