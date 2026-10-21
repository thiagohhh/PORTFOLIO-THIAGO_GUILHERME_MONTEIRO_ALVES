import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";


export const publicFolder = fileURLToPath(
  new URL("../../public", import.meta.url)
);

mkdirSync(publicFolder, { recursive: true });



const storage = multer.diskStorage({
 
  
  destination: (_request, _file, callback) => {
    callback(null, publicFolder);
  },


  
  filename: (_request, file, callback) => {
    const extensao = path.extname(file.originalname); 
    const nomeUnico =
      Date.now() + "-" + Math.random().toString(36).slice(2, 10);

    callback(null, file.fieldname + "-" + nomeUnico + extensao);
  },
});

const upload = multer({ storage });

export default upload;