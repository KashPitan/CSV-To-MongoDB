const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  Title: {
    type: String,
    required: [true, "Track records require a title"],
  },
  Version: String,
  Artist: String,
  ISRC: {
    type: String,
    required: [true, "Track records require an ISRC value"],
  },
  P_Line: String,
  Aliases: [],
  ContractID: {
    type: Schema.Types.ObjectId,
    ref: "contract",
  },
});

TrackSchema.post("save", (err, doc, next) => {
  //exit if no errors
  if (!err) next();

  let errorArray = [];
  for (const key in err.errors) {
    // console.log("KEY:" + key);
    switch (key) {
      case "Title":
        errorArray.push("Title required");
      case "ISRC":
        errorArray.push("ISRC required");
        break;
    }
  }
  next(new Error(errorArray));
});

const TrackModel = mongoose.model("track", TrackSchema);

module.exports = TrackModel;
