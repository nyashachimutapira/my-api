const Project = require('../models/project');
const Company = require('../models/company');
const Contact = require('../models/contact');

const REQUIRED_FIELDS = ['title', 'description', 'company', 'startDate', 'budget'];

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

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('company')
      .populate('teamLead')
      .sort({ startDate: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('company')
      .populate('teamLead');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    validateFields(req.body);
    await ensureCompanyExists(req.body.company);
    if (req.body.teamLead) {
      await ensureContactExists(req.body.teamLead);
    }

    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ _id: project._id });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Project title already exists' });
    }
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const currentProject = await Project.findById(req.params.id);
    if (!currentProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (req.body.company) {
      await ensureCompanyExists(req.body.company);
    }
    if (req.body.teamLead) {
      await ensureContactExists(req.body.teamLead);
    }

    // Check for duplicate title
    if (req.body.title && req.body.title !== currentProject.title) {
      const existingProject = await Project.findOne({ title: req.body.title });
      if (existingProject) {
        return res.status(400).json({ error: 'Project title already exists' });
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Project not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Project title already exists' });
    }
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || 'Bad request' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
