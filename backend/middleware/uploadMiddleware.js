import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../config/env.js';

const uploadDir = path.resolve(env.uploadPath);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  }
});

const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

export const uploadKyc = multer({
  storage,
  limits: { fileSize: env.maxFileSize },
  fileFilter: (_, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF/JPG/PNG allowed.'));
    }
    cb(null, true);
  }
});
