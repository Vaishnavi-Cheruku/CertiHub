import ResidenceCertificate from '../models/ResidenceCertificate.js';
import path from 'path';

export const createResidenceCertificate = async (req, res) => {
  try {
    const {
      userId,
      officialName,
      officialDesignation,
      applicantName,
      parentSpouseName,
      villageTownWard,
      mandal,
      district,
      fullName,
      guardianName,
      landlinePhone,
      mobilePhone,
      email
    } = req.body;

    const photo = req.files['photo'][0].filename;
    const documents = req.files['documents'] ? req.files['documents'].map(file => file.filename) : [];

    const newApp = new ResidenceCertificate({
      userId,
      officialName,
      officialDesignation,
      applicantName,
      parentSpouseName,
      villageTownWard,
      mandal,
      district,
      fullName,
      guardianName,
      landlinePhone,
      mobilePhone,
      email,
      photo,
      documents
    });

    await newApp.save();
    res.status(201).json({ message: 'Residence certificate application submitted successfully.' });
  } catch (error) {
    console.error('Residence Certificate Submission Error:', error);
    res.status(500).json({ message: 'Error submitting residence certificate application.' });
  }
};

export const getResidenceApplications = async (req, res) => {
  try {
    const applications = await ResidenceCertificate.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
};

export const getResidenceApplicationById = async (req, res) => {
  try {
    const application = await ResidenceCertificate.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found.' });
    res.status(200).json(application);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching application.' });
  }
};
