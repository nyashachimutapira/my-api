const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerId: { type: String, required: true, index: true },
  username: { type: String, trim: true },
  displayName: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  avatarUrl: { type: String, trim: true },
  profileUrl: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

