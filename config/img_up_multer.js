// const multer = require("multer");

// // @sample destination - "./uploads"

//   const uploadIMG = (destination)=>{
//     const storage = multer.diskStorage({
//         destination: function (req, file, callback) {
//           callback(null, destination);
//         },
//         filename: function (req, file, callback) {
//           const uniqueName = Date.now() + "-" + file.originalname;
//           callback(null, uniqueName);
//         },
//       });
//       return multer({ storage });
//   }

//   module.exports = uploadIMG;

const multer = require("multer");
const path = require("path");

const uploadIMG = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, destination);
    },
    filename: function (req, file, callback) {
      const uniqueName = Date.now() + "-" + file.originalname;
      callback(null, uniqueName);
    },
  });

  const fileFilter = (req, file, callback) => {
    // Example: Allow only JPEG, PNG, and GIF files
    if (file.mimetype.startsWith('image/') && ['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  };

  const limits = {
    fileSize: 10 * 1024 * 1024, // Example: Limit file size to 5MB
  };

  return multer({ storage, fileFilter });
};

module.exports = uploadIMG;
