const Company = require('../models/company');
const Contact = require('../models/contact');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ _id: company._id });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Company name already exists' });
    }
    res.status(400).json({ error: err.message || 'Bad request' });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    // Get the current company to check if name is being changed
    const currentCompany = await Company.findById(req.params.id);
    if (!currentCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // If name is being changed, check if it already exists
    if (req.body.name && req.body.name !== currentCompany.name) {
      const existingCompany = await Company.findOne({ name: req.body.name });
      if (existingCompany) {
        return res.status(400).json({ error: 'Company name already exists' });
      }
    }

    // Update the company
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Company not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Company name already exists' });
    }
    res.status(400).json({ error: err.message || 'Bad request' });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const hasContacts = await Contact.exists({ company: companyId });
    if (hasContacts) {
      return res.status(400).json({ error: 'Cannot delete company with assigned contacts' });
    }

    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

