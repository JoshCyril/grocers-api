// const util = require("util");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// var storage = new GridFsStorage({
//   url: "mongodb+srv://gro-api:w942SLz51gJa1a69@cluster0.7wpt8x6.mongodb.net/grocers-api",
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-${file.originalname}`
//     };
//   }
// });

// //Configuration for Multer
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// var uploadFiles = multer({ storage: storage, dest: "public/"  }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFiles);
// module.exports = uploadFilesMiddleware;