import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

let initialized = false;

// 1. Check if full JSON string is provided in environment variable (Ideal for Render/Vercel)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: cert(serviceAccount)
    });
    initialized = true;
    console.log("✅ Firebase Admin initialized from FIREBASE_SERVICE_ACCOUNT env variable");
  } catch (err) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", err);
  }
}

// 2. Check if Render Secret File or custom path is provided
const renderSecretPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "/etc/secrets/serviceAccountKey.json";
if (!initialized && fs.existsSync(renderSecretPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(renderSecretPath, "utf8"));
    admin.initializeApp({
      credential: cert(serviceAccount)
    });
    initialized = true;
    console.log(`✅ Firebase Admin initialized from secret file at ${renderSecretPath}`);
  } catch (err) {
    console.error("❌ Failed to load secret file:", err);
  }
}

// 3. Check local file (for local development)
if (!initialized && fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    admin.initializeApp({
      credential: cert(serviceAccount)
    });
    initialized = true;
    console.log("✅ Firebase Admin initialized from local serviceAccountKey.json");
  } catch (err) {
    console.error("❌ Failed to load local serviceAccountKey.json:", err);
  }
}

if (!initialized) {
  console.warn("⚠️ Firebase service account credentials not found! Sync/auth will fail on server.");
}

export default admin;
