const Contact = require('../models/contact');
const Company = require('../models/company');

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'favoriteColor',
  'birthday',
  'jobTitle',
  'company',
  'street',
  'city',
  'country',
];

function validateFields(body) {
  const missing = REQUIRED_FIELDS.filter(field => !body[field]);
  if (missing.length) {
    const message = `Missing required fields: ${missing.join(', ')}`;
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
}

async function ensureCompany(companyId) {
  const companyExists = await Company.exists({ _id: companyId });
  if (!companyExists) {
    const error = new Error('Company not found');
    error.statusCode = 400;
    throw error;
  }
}

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate('company')
      .sort({ lastName: 1, firstName: 1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('company');
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createContact = async (req, res) => {
  try {
    validateFields(req.body);
    await ensureCompany(req.body.company);
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ _id: contact._id });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    if (req.body.company) {
      await ensureCompany(req.body.company);
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Contact not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

