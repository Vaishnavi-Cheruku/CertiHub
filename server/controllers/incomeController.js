// controllers/incomeController.js - Update this file
import IncomeCertificate from '../models/IncomeCertificate.js';
import staffModel from '../models/staffModel.js';

// Assign application to MRO staff - helper function
async function assignToMRO(applicationId) {
  const vaishnavi = '67dbcf81993e7c68bfa7fa4e'; // Vaishnavi's staff ID
  const joyce = '680d98877893a78c9e59cec0';    // Joyce's staff ID
  
  // Count pending applications for Vaishnavi
  const vaishnaviAppCount = await IncomeCertificate.countDocuments({
    assignedTo: vaishnavi,
    status: 'pending'
  });
  
  // If Vaishnavi has 10 or more pending applications, assign to Joyce
  const assignedTo = vaishnaviAppCount >= 10 ? joyce : vaishnavi;
  
  await IncomeCertificate.findByIdAndUpdate(applicationId, { assignedTo });
  
  return {
    assignedTo,
    redirected: assignedTo === joyce
  };
}

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
      pincode,
      purpose,
      incomeFromLand,
      incomeFromBusiness,
      incomeSalary,
      incomeDailyWage,
      incomeOtherSources,
      incomeOtherDetails
    } = req.body;

    const photo = req.file?.filename || null;

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

    // Save the certificate first to get an ID
    const savedCertificate = await incomeCertificate.save();
    
    // Now assign it to an MRO staff member
    const assignment = await assignToMRO(savedCertificate._id);
    
    let message = 'Income certificate application submitted successfully!';
    if (assignment.redirected) {
      message += ' Due to high volume, your application has been redirected to another officer.';
    }
    
    res.status(201).json({ message, applicationId: savedCertificate._id });
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

// Get applications assigned to staff member
export const getStaffApplications = async (req, res) => {
  try {
    const { staffId, status } = req.params;
    
    // Query based on status and assigned staff
    const query = { assignedTo: staffId };
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }
    
    const applications = await IncomeCertificate.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(applications);
  } catch (error) {
    console.error('Fetching Staff Applications Error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Update application status (approve/reject)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, reviewComments, staffId } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const updatedApplication = await IncomeCertificate.findByIdAndUpdate(
      applicationId,
      {
        status,
        reviewComments,
        reviewedBy: staffId,
        reviewDate: new Date()
      },
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({ 
      message: `Application ${status} successfully`,
      application: updatedApplication
    });
  } catch (error) {
    console.error('Update Application Error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
};

// Get application details by ID
export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const application = await IncomeCertificate.findById(applicationId)
      .populate('userId', 'name email')
      .populate('assignedTo', 'fullName')
      .populate('reviewedBy', 'fullName');
      
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Fetching Application Details Error:', error);
    res.status(500).json({ error: 'Failed to fetch application details' });
  }
};

// Get staff workload info
export const getStaffWorkload = async (req, res) => {
  try {
    const vaishnavi = '67dbcf81993e7c68bfa7fa4e';
    const joyce = '680d98877893a78c9e59cec0';
    
    const vaishnaviPending = await IncomeCertificate.countDocuments({
      assignedTo: vaishnavi,
      status: 'pending'
    });
    
    const joycePending = await IncomeCertificate.countDocuments({
      assignedTo: joyce,
      status: 'pending'
    });
    
    res.json({
      vaishnavi: {
        id: vaishnavi,
        pendingCount: vaishnaviPending,
        isOverloaded: vaishnaviPending >= 10
      },
      joyce: {
        id: joyce,
        pendingCount: joycePending,
        isOverloaded: joycePending >= 10
      }
    });
  } catch (error) {
    console.error('Fetching Staff Workload Error:', error);
    res.status(500).json({ error: 'Failed to fetch staff workload information' });
  }
};