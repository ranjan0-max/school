const { Schema, model } = require("mongoose");
const userConfigSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  config: { type: Array, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

const UserConfig = model("UserConfig", userConfigSchema);
module.exports = UserConfig;
