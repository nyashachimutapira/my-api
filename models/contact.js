const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9()\s-]{7,}$/;

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: emailRegex,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: phoneRegex,
  },
  favoriteColor: { type: String, required: true, trim: true },
  birthday: { type: Date, required: true },
  jobTitle: { type: String, required: true, trim: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  notes: { type: String, trim: true, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

