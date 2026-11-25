import { randomUUID } from "node:crypto";
import path from "node:path";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const parser = multer({ storage: multer.memoryStorage() });
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

async function uploadToStorage(file) {
  const client = getSupabaseClient();
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-media";
  const extension = path.extname(file.originalname).toLowerCase();
  const filePath = `${Date.now()}-${randomUUID()}${extension}`;
  const bucket = client.storage.from(bucketName);

  const { error } = await bucket.upload(filePath, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) {
    throw error;
  }

  return bucket.getPublicUrl(filePath).data.publicUrl;
}

const upload = {
  single(fieldName) {
    const parseSingle = parser.single(fieldName);

    return (request, response, next) => {
      parseSingle(request, response, (parseError) => {
        if (parseError) {
          return next(parseError);
        }

        if (!request.file) {
          return next();
        }

        uploadToStorage(request.file)
          .then((publicUrl) => {
            request.file.filename = publicUrl;
            next();
          })
          .catch(next);
      });
    };
  },
};

export default upload;
