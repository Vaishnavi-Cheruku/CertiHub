import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/caste';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf/;
  const isValidExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowed.test(file.mimetype);
  isValidExt && isValidMime ? cb(null, true) : cb(new Error('Invalid file type.'));
};

const casteUpload = multer({
  storage,
  fileFilter
}).fields([
  { name: 'applicationForm', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
  { name: 'proofOfCaste', maxCount: 1 },
  { name: 'proofOfIdentity', maxCount: 1 },
  { name: 'passportPhoto', maxCount: 1 }
]);

export default casteUpload;
