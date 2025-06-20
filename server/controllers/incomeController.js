// controllers/incomeController.js - Update this file
import IncomeCertificate from '../models/IncomeCertificate.js';
import staffModel from '../models/staffModel.js';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

async function assignToMRO(applicationId) {
  const userOne = '67dbcf81993e7c68bfa7fa4e'; 
  const userTwo = '680d98877893a78c9e59cec0'; 
  
  // Count pending applications for userOne
  const userOneAppCount = await IncomeCertificate.countDocuments({
    assignedTo: userOne,
    status: 'pending'
  });
  
  // If userOne has 10 or more pending applications, assign to userTwo
  const assignedTo = userOneAppCount >= 10 ? userTwo : userOne;
  
  await IncomeCertificate.findByIdAndUpdate(applicationId, { assignedTo });
  
  return {
    assignedTo,
    redirected: assignedTo === userTwo
  };
}


// Helper function to send application submission confirmation email
async function sendApplicationSubmissionEmail(userId, applicationId, fullName) {
  try {
    // Fetch user details to get email
    const user = await userModel.findById(userId);
    if (!user || !user.email) {
      console.error('Cannot send email: User not found or no email available');
      return;
    }

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Income Certificate Application Submitted',
      text: `Dear ${fullName},

Thank you for submitting your Income Certificate application. Your application ID is ${applicationId}.

We will review your application and update you on its status. You can also check the status by logging into your CertiHub account.

Regards,
CertiHub Team`
    };

    await transporter.sendMail(mailOption);
    console.log('✅ Application submission email sent successfully to:', user.email);
  } catch (err) {
    console.error('❌ Application submission email sending failed:', err);
  }
}

// Helper function to send application status update email
async function sendStatusUpdateEmail(application, status) {
  try {
    // Get user details to get their email
    const user = await userModel.findById(application.userId);
    if (!user || !user.email) {
      console.error('Cannot send status update email: User not found or no email available');
      return;
    }

    const statusText = status === 'approved' ? 'approved' : 'rejected';
    const additionalInfo = status === 'approved' 
      ? 'You can download your certificate by logging into your CertiHub account.' 
      : `Reason: ${application.reviewComments || 'No specific reason provided.'}`;

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Income Certificate Application ${statusText.toUpperCase()}`,
      text: `Dear ${application.fullName},

Your Income Certificate application (ID: ${application._id}) has been ${statusText}.

${additionalInfo}

If you have any questions, please contact our support team.

Regards,
CertiHub Team`
    };

    await transporter.sendMail(mailOption);
    console.log(`✅ Application ${statusText} email sent successfully to:`, user.email);
  } catch (err) {
    console.error(`❌ Application ${status} email sending failed:`, err);
  }
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
    
    // Send email confirmation to user
    await sendApplicationSubmissionEmail(userId, savedCertificate._id, fullName);
    
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
    
    // Send email notification based on the status update
    await sendStatusUpdateEmail(updatedApplication, status);
    
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
    const userOne = '67dbcf81993e7c68bfa7fa4e'; // Vaishnavi's staff ID
    const userTwo = '680d98877893a78c9e59cec0'; // Joyce's staff ID
    
    const userOnePending = await IncomeCertificate.countDocuments({
      assignedTo: userOne,
      status: 'pending'
    });
    
    const userTwoPending = await IncomeCertificate.countDocuments({
      assignedTo: userTwo,
      status: 'pending'
    });
    
    res.json({
      userOne: {
        id: userOne,
        pendingCount: userOnePending,
        isOverloaded: userOnePending >= 10
      },
      userTwo: {
        id: userTwo,
        pendingCount: userTwoPending,
        isOverloaded: userTwoPending >= 10
      }
    });
  } catch (error) {
    console.error('Fetching Staff Workload Error:', error);
    res.status(500).json({ error: 'Failed to fetch staff workload information' });
  }
};
