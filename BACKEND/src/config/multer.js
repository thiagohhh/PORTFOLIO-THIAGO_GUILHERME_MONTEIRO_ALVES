import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const diretorioUploads = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public/uploads",
);

mkdirSync(diretorioUploads, { recursive: true });

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, diretorioUploads);
  },
  filename: (_request, file, callback) => {
    const extensao = path.extname(file.originalname);
    callback(null, `${randomUUID()}${extensao}`);
  },
});

const upload = multer({ storage });

export default upload;