import CasteCertificate from '../models/CasteCertificate.js';

export const createCasteCertificate = async (req, res) => {
  try {
    const {
      userId,
      applicantName,
      relation,
      motherName,
      gender,
      dob,
      doorNo,
      landmark,
      district,
      mandal,
      village,
      pincode,
      rationCardNo,
      mobileNo,
      aadhaarNo,
      issuedBefore,
      casteClaimed,
      casteCategory,
      purpose,
      religion
    } = req.body;

    const documents = {
      applicationForm: req.files['applicationForm']?.[0]?.filename || '',
      proofOfAddress: req.files['proofOfAddress']?.[0]?.filename || '',
      proofOfCaste: req.files['proofOfCaste']?.[0]?.filename || '',
      proofOfIdentity: req.files['proofOfIdentity']?.[0]?.filename || '',
      passportPhoto: req.files['passportPhoto']?.[0]?.filename || ''
    };

    const newApp = new CasteCertificate({
      userId,
      applicantName,
      relation,
      motherName,
      gender,
      dob,
      doorNo,
      landmark,
      district,
      mandal,
      village,
      pincode,
      rationCardNo,
      mobileNo,
      aadhaarNo,
      issuedBefore,
      casteClaimed,
      casteCategory,
      purpose,
      religion,
      documents
    });

    await newApp.save();
    res.status(201).json({ message: 'Caste certificate application submitted successfully.' });
  } catch (error) {
    console.error('Caste Certificate Submission Error:', error);
    res.status(500).json({ message: 'Error submitting caste certificate application.' });
  }
};

export const getCasteApplications = async (req, res) => {
  try {
    const applications = await CasteCertificate.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
};

export const getCasteApplicationById = async (req, res) => {
  try {
    const application = await CasteCertificate.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found.' });
    res.status(200).json(application);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching application.' });
  }
};
