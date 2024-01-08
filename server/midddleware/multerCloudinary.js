
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config()

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_APIKEY,
  api_secret:process.env.CLOUDINARY_APISECRET
  
});


const storageOptions = {
  cloudinary,
  params: {
    folder: 'Ecommerce',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
    public_id: (req, file) => {
      const fileName = file.originalname.split('.').slice(0, -1).join('.');
      return fileName;
    },
  },
};


const storage = new CloudinaryStorage(storageOptions);


const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: `Multer error: ${err.message} (Field: ${err.field})` });
    } else if (err && err.message) {
      res.status(500).json({ error: err.message });
    } else {
      next();
    }
  };
  
const     upload = multer({ storage });


export { upload, handleUploadErrors };
