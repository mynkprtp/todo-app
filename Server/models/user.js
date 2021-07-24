const mongoose = require("mongoose");
const schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "Task" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
