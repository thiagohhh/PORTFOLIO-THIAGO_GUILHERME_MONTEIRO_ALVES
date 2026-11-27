import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const parser = multer({ storage: multer.memoryStorage() });
const pastaUploads = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public/uploads"
);
let supabaseClient;

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for uploads."
    );
  }

  supabaseClient ??= createClient(supabaseUrl, serviceRoleKey);
  return supabaseClient;
}

async function salvarArquivo(file) {
  const extension = path.extname(file.originalname).toLowerCase();
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;

  if (process.env.STORAGE_LOCAL === "true") {
    await fs.mkdir(pastaUploads, { recursive: true });
    await fs.writeFile(path.join(pastaUploads, fileName), file.buffer);
    return `http://localhost:3333/uploads/${fileName}`;
  }

  const client = getSupabaseClient();
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-media";
  const bucket = client.storage.from(bucketName);
  const { error } = await bucket.upload(fileName, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) throw error;
  return bucket.getPublicUrl(fileName).data.publicUrl;
}

const upload = {
  single(fieldName) {
    const parseSingle = parser.single(fieldName);
    return (request, response, next) => {
      parseSingle(request, response, (parseError) => {
        if (parseError) return next(parseError);
        if (!request.file) return next();

        salvarArquivo(request.file)
          .then((url) => {
            request.file.filename = url;
            next();
          })
          .catch(next);
      });
    };
  },
};

export default upload;
