const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads',
    public_id: `${file.originalname.replace(/\.[^/.]+$/, "")}-LadiesOfWisdom`, // Nome do arquivo
    resource_type: 'raw', // Mantém o arquivo como original
    type: 'upload', // Torna público
  }),
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
