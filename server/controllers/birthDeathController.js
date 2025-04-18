import BirthCertificate from "../models/BirthCertificate.js";
import DeathCertificate from "../models/DeathCertificate.js";

export const submitBirthCertificate = async (req, res) => {
  try {
    const data = new BirthCertificate(req.body);
    await data.save();
    res.status(200).json({ message: "Birth certificate submitted successfully!" });
  } catch (err) {
    console.error("Birth Certificate Submission Error:", err);
    res.status(400).json({ error: "Failed to submit birth certificate", details: err.message });
  }
};

export const getBirthCertificates = async (req, res) => {
  try {
    const allBirths = await BirthCertificate.find();
    res.status(200).json(allBirths);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch birth certificates", details: err.message });
  }
};

export const submitDeathCertificate = async (req, res) => {
  try {
    const data = new DeathCertificate(req.body);
    await data.save();
    res.status(200).json({ message: "Death certificate submitted successfully!" });
  } catch (err) {
    console.error("Death Certificate Submission Error:", err);
    res.status(400).json({ error: "Failed to submit death certificate", details: err.message });
  }
};

export const getDeathCertificates = async (req, res) => {
  try {
    const allDeaths = await DeathCertificate.find();
    res.status(200).json(allDeaths);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch death certificates", details: err.message });
  }
};
