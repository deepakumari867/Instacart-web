import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  
  admin.initializeApp({
    credential: cert(serviceAccount)
  });
} else {
  console.warn("⚠️ Firebase serviceAccountKey.json not found in server/config/");
}

export default admin;
