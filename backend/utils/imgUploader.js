import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination({ params: { type } }, file, cb) {
    cb(
      null,
      `${
        type === "admin"
          ? process.env.ADMIN_FILE_UPLOAD_PATH
          : type === "client" && process.env.CLIENT_FILE_UPLOAD_PATH
      }`
    );
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only Images Allowed!");
  }
}

const imgUploader = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default imgUploader;
