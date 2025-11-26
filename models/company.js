const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9()\s-]{7,}$/;

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  industry: { type: String, required: true, trim: true },
  website: {
    type: String,
    trim: true,
    match: /^https?:\/\/.+/i,
  },
  supportEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: emailRegex,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: phoneRegex,
  },
  hqCity: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

