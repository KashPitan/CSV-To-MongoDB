const chai = require("chai");
const Track = require("../Models/Track");
const Contract = require("../Models/Contract");
const should = require("should");
const mongoose = require("mongoose");

describe("TEST GROUP: Track CRUD", function () {
  let contract;
  beforeEach((done) => {
    let _id = mongoose.Types.ObjectId();
    contract = new Contract({
      _id: _id,
      Name: "Contract1",
    });
    contract
      .save()
      .then((contract) => {
        console.log("BeforeEach hook adding contract: successful");
        done();
      })
      .catch((err) => {
        done();
        console.log(err);
      });
  });
  //test adding user to users collection
  it("TEST #1: Create a track", function (done) {
    let track = new Track({
      Title: "Track 1",
      Version: "Version 1",
      Artist: "Artist 1",
      ISRC: "ISRC1",
      P_Line: "P Line 1",
      Aliases: ["aliases1", "aliases2"],
      Contract: contract._id,
    });
    track.validate((err) => {
      should.not.exist(err);
      done();
    });
  });

  it("TEST #2: Create an invalid track", function (done) {
    //Has no title so should fail
    let track = new Track({
      Version: "Version 1",
      Artist: "Artist 1",
      ISRC: "ISRC1",
      P_Line: "P Line 1",
      Aliases: ["aliases1", "aliases2"],
      Contract: contract._id,
    });

    track.validate((err) => {
      should.exist(err);
      done();
    });
  });

  it("TEST #3: Retrieve a track", function (done) {
    done();
  });
});
