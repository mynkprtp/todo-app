const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default:false,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// ref refers to the schema model mentioned in the property

module.exports = mongoose.model("Task", taskSchema);
