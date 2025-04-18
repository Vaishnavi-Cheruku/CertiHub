import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads/residence directory exists
const uploadPath = 'uploads/residence';
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
  const allowed = /jpeg|jpg|png|pdf|doc|docx/;
  const isValidExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowed.test(file.mimetype);
  isValidExt && isValidMime ? cb(null, true) : cb(new Error('Invalid file type.'));
};

const residenceUpload = multer({
  storage,
  fileFilter
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]);

export default residenceUpload;
