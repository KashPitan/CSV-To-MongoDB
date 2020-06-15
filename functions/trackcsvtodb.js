const csv = require("csvtojson");
const Track = require("../Models/Track");
const Contract = require("../Models/Contract");
const mongoose = require("mongoose");

//store error messages for each record
var errors = [];

//parse csv file and perform database operations
parseCSV = async (path) => {
  if (path === null) return;

  //parse csv into jsonObject array
  let jsonObj = await csv({
    colParser: {
      Aliases: (item) => {
        //4. split into array and remove trailing and preceeding spaces from aliases
        return item.split(";").map((alias) => alias.trim());
      },
      ISRC: (item) => {
        //remove all non alphabetical characters from ISRC column
        return item.replace(/\W/g, "");
      },
    },
  })
    .fromFile(path)
    .subscribe((json, index) => {
      //validation,errors and writing into database
      return new Promise(async (resolve, reject) => {
        let contract;
        var track = new Track(json);
        // console.log(track);
        //query to check if contract exists in database
        try {
          contract = await Contract.findOne({ Name: json.Contract });
        } catch (err) {
          console.log(err);
        }

        //5.3 save track if there is no contract listed on the track
        if (json.Contract === "") {
          await writeIntoDatabase(track, index);
          resolve();
          return;
          //5.2 if the contract listed on the track doesn't exist
        } else if (contract === null) {
          errors.push({
            lineNumber: index,
            errors: ["contract does not exist"],
          });
          resolve();
          return;
        } else {
          //5.1 if there is a contract and it exists in the database save it
          //can't seem to change contract id value to create link
          json.Contract = contract._id;
          track = new Track(json);

          await writeIntoDatabase(track, index);
          resolve();
          return;
        }
      });
    });
  console.log(errors);
  //7. return error array
  return errors;
};

writeIntoDatabase = async (trackInput, index) => {
  if (trackInput === null) return;
  // console.log(trackInput);
  try {
    await trackInput.save().then((track) => {
      // console.log("writing: " + track);
    });
  } catch (err) {
    let errorMessages = err.message.split(",");
    errors.push({ lineNumber: index, errors: errorMessages });
  }
};

module.exports = parseCSV;
