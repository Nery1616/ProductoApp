const multer = require("multer");
const path = require("path");

// Mensajes centralizados
const VALIDATION_MESSAGES = {
  invalidFile: "Solo se podra permitir imágenes en formato .jpeg, .jpg, .png o .webp",
  tooLarge: "El archivo excede el tamaño máximo permitido (5MB)"
};

// Usamos memoria para no guardar en disco
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(ext);

  // Evita extensiones encadenadas como .jpg.exe
  const baseName = path.basename(file.originalname);
  const isCleanName = /^[a-zA-Z0-9_\-]+\.(jpeg|jpg|png|webp)$/i.test(baseName);

  if (mimetype && extname && isCleanName) {
    cb(null, true);
  } else {
    req.fileValidationError = VALIDATION_MESSAGES.invalidFile;
    cb(null, false);
  }
};
//Tmañano limite
const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB
};
//Middleware principal
const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = {
    uploadSingle: upload.single("imagen"),
    uploadMultiple: upload.array("imagenes", 5),
    VALIDATION_MESSAGES
};
