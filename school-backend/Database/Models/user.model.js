const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  user_id: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  device_token: {
    type: String,
    default: 'sdfgfdswsdf'
  },
  refresh_token: {
    type: String,
    default: 'sdfgfdswefrg'
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  active_status: {
    type: Boolean,
    default: false
  },
  profile_image: {
    type: String
  },
  config_status: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

const User = model('User', userSchema);
module.exports = User;
