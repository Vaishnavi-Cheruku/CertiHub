// controllers/trackingController.js
import IncomeCertificate from '../models/IncomeCertificate.js';
import ResidenceCertificate from '../models/ResidenceCertificate.js';


export const trackApplicationById = async (req, res) => {
  const { applicationId } = req.params;

  try {
    let application =
      await IncomeCertificate.findById(applicationId) ||
      await ResidenceCertificate.findById(applicationId); // add others as needed

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      id: application._id,
      name: application.applicantName || application.fullName,
      status: application.status,
      lastUpdated: application.updatedAt || application.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: "Server error while tracking application" });
  }
};
