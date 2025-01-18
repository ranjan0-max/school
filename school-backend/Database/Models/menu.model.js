const { Schema, model } = require("mongoose");
const menuSchema = new Schema({
  menu_id: { type: Number, required: true },
  id: { type: String, required: true },
  title: { type: String },
  type: { type: String },
  icon: { type: String },
  accesss: { type: Boolean },
  children: { type: Array },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Menu = model("Menu", menuSchema);
module.exports = Menu;
