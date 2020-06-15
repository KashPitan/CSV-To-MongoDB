const chai = require("chai");
const assert = chai.assert;
const Track = require("../Models/Track");
const Contract = require("../Models/Contract");
const should = require("should");

describe("TEST GROUP: Contract CRUD", function () {
  //test adding user to users collection
  it("TEST #1: Create a valid contract record", function (done) {
    let contract = new Contract({
      Name: "Contract1",
    });

    contract.validate((err) => {
      console.log(err);
      should.not.exist(err);
      done();
    });
    // contract
    //   .save()
    //   .then((contract) => {
    //     console.log(contract);
    //     should.exist(contract);
    //     done();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });

  it("TEST #2: Create an invalid contract record", function (done) {
    /*contract does not have required details so 
      should not get added due to validation error*/
    let contract = new Contract({});
    contract.validate((err) => {
      // console.log(err);
      should.exist(err);
      done();
    });
    // contract
    //   .save()
    //   .then((contract) => {
    //     done();
    //   })
    //   .catch((err) => {
    //     should.exist(err);
    //     console.log(err.errors.Name.properties.message);
    //     done();
    //   });
  });
});
