const Review = require('../models/review');
const Company = require('../models/company');
const Contact = require('../models/contact');

const REQUIRED_FIELDS = ['title', 'content', 'rating', 'company', 'reviewer'];

function validateFields(body) {
  const missing = REQUIRED_FIELDS.filter(field => !body[field]);
  if (missing.length) {
    const message = `Missing required fields: ${missing.join(', ')}`;
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
}

async function ensureCompanyExists(companyId) {
  const companyExists = await Company.exists({ _id: companyId });
  if (!companyExists) {
    const error = new Error('Company not found');
    error.statusCode = 400;
    throw error;
  }
}

async function ensureContactExists(contactId) {
  const contactExists = await Contact.exists({ _id: contactId });
  if (!contactExists) {
    const error = new Error('Contact not found');
    error.statusCode = 400;
    throw error;
  }
}

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('company')
      .populate('reviewer')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('company')
      .populate('reviewer');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createReview = async (req, res) => {
  try {
    validateFields(req.body);
    await ensureCompanyExists(req.body.company);
    await ensureContactExists(req.body.reviewer);

    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ _id: review._id });
  } catch (err) {
    console.error(err);
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const currentReview = await Review.findById(req.params.id);
    if (!currentReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (req.body.company) {
      await ensureCompanyExists(req.body.company);
    }
    if (req.body.reviewer) {
      await ensureContactExists(req.body.reviewer);
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Review not found' });
    }
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
