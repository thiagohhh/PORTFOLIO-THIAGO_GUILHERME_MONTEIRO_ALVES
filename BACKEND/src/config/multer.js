import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const publicFolder = path.resolve(__dirname, "../../public");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, publicFolder);
  },
  filename: (request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${randomUUID()}${extension}`);
  },
});

const fileFilter = (request, file, callback) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  const isPdf = file.mimetype === "application/pdf";

  if (isImage || isVideo || isPdf) {
    return callback(null, true);
  }

  return callback(new Error("Envie uma imagem, um vídeo ou um arquivo PDF."));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});