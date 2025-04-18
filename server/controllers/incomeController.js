import IncomeCertificate from '../models/IncomeCertificate.js';

// Handle form submission
export const createIncomeCertificate = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      parentName,
      wardVillage,
      mandal,
      houseNumber,
      rationCardType,
      rationCardNumber,
      totalAnnualIncome,
      pincode, // ✅ added here
      purpose,
      incomeFromLand,
      incomeFromBusiness,
      incomeSalary,
      incomeDailyWage,
      incomeOtherSources,
      incomeOtherDetails
    } = req.body;

    const photo = req.file?.filename || null; // Make sure file exists

    const incomeCertificate = new IncomeCertificate({
      userId,
      fullName,
      parentName,
      wardVillage,
      mandal,
      houseNumber,
      rationCardType,
      rationCardNumber,
      totalAnnualIncome,
      pincode,
      purpose,
      incomeFromLand,
      incomeFromBusiness,
      incomeSalary,
      incomeDailyWage,
      incomeOtherSources,
      incomeOtherDetails,
      photo,
    });

    await incomeCertificate.save();
    res.status(201).json({ message: 'Income certificate application submitted successfully!' });
  } catch (err) {
    console.error('Income Certificate Submission Error:', err);
    res.status(500).json({ message: 'Error submitting form. Please try again.' });
  }
};

// Fetch income certificate applications for a user
export const getUserIncomeCertificates = async (req, res) => {
  const { userId } = req.params;
  try {
    const applications = await IncomeCertificate.find({ userId });
    res.json(applications);
  } catch (error) {
    console.error('Fetching Applications Error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
