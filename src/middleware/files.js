const fs = require('fs');
const path = require("path");
const multer = require("multer");

const fileImageFilter = (req, file, cb) => {
  const allowedFileTypes = /\.(jpg|jpeg|png)$/; // Allow only PNG and JPG files
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (extname) {
    return cb(null, true);
  } else {
    const errorResponse = {
      status: false,
      message: "Only JPEG, JPG, and PNG files are allowed!",
    };
    return cb(errorResponse, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the full path of image location to be saved in
    const fullPath = path.join(__dirname, "..", "..", `public/uploads`);
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const randomValue = Math.floor(1000 + Math.random() * 9000);
    const extname = path.extname(file.originalname);
    const new_name = file.fieldname + "_" + uniqueSuffix + "-" + randomValue;
    cb(null, `${new_name}${extname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileImageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB in bytes
  },
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Could not upload image." });
    }
    if (!req.file)
      return res
        .status(400)
        .json({ status: false, message: "Image is required to proceed" });
    next();
  });
};

const uploadImageOptional = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Could not upload image." });
    }
    next();
  });
};

const uploadMultipleImages = (req, res, next) => {
  upload.array("images", 3)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Could not upload images." });
    }

    if (!req.files || (req.files && req.files.length === 0))
      return res
        .status(400)
        .json({ status: false, message: "Images are required to proceed" });
    next();
  });
};

const uploadMultipleImagesOptional = (req, res, next) => {
  upload.array("images", 3)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ status: false, message: "Could not upload images." });
    }
    next();
  });
};

const deleteFile = (image) => {
  if (image) {
    fs.unlinkSync(image.path);
  }
}

const deleteMultipleFiles = (images) => {
  if (images && images.length > 0) {
    images.forEach((img) => {
      deleteFile(img);
    })
  }
}

module.exports = { deleteFile, deleteMultipleFiles, uploadImage, uploadImageOptional, uploadMultipleImages, uploadMultipleImagesOptional };
