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
  params: async (req, file) => {
    let fileExtension = file.originalname.split('.').pop(); // Obtém a extensão do arquivo
    const fileName = file.originalname.replace(/\.[^/.]+$/, ""); // Remove a extensão do nome
    const resourceType = fileExtension === "pdf" ? "raw" : "auto"; // Define o tipo correto
    if (fileExtension != 'pdf') {
      fileExtension = '.'+fileExtension
    } else {
      fileExtension = ''
    }

    return {
      folder: 'uploads',
      public_id: `${fileName}-LadiesOfWisdom${fileExtension}`, // Mantém a extensão original
      resource_type: resourceType, // Mantém o tipo correto do arquivo
      type: 'upload',
    };
  },
});

console.log(storage.public_id)
const upload = multer({ storage });

module.exports = { cloudinary, upload };
