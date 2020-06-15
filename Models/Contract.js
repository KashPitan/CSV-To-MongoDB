const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Contract records require a name"],
  },
});

const ContractModel = mongoose.model("contract", ContractSchema);

module.exports = ContractModel;
