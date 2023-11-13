const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    Product_code: {
      type: String,
    },
    Product_name: {
      type: String,
    },
    Generic_name: {
      type: String,
      required: true,
    },
    CurStock_Level: {
      type: Number,
    },
    Recorder_Level: {
      type: Number,
    },
    LastPurchaseDate: {
      type: Date,
    },
    RunningRR: {
      type: Number,
    },
    Discard: {
      type: Number,
    },
  },
  { timestamp: true, collection: "medicinestorage" }
);

const MedicineStorage = mongoose.model("medicinestorage", MedicineSchema);
module.exports = MedicineStorage;
