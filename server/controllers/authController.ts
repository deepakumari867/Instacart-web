import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { getAuth } from "firebase-admin/auth";

// Check if user is admin
const getAdminStatus = (email: string | null | undefined): boolean => {
    if (!email) return false;
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : [];
    return adminEmails.includes(email.toLowerCase());
};

// Sync User (Called after Firebase Login/Register)
// POST /api/auth/sync
export const syncUser = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await getAuth().verifyIdToken(token);
        
        const { uid, email, name, picture } = decodedToken;

        if (!email) {
            return res.status(400).json({ message: "Firebase user must have an email" });
        }

        // Find existing user by Firebase UID or Email
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { firebaseUid: uid },
                    { email: email.toLowerCase() }
                ]
            },
            include: { addresses: true }
        });

        // Create if not exists
        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid: uid,
                    email: email.toLowerCase(),
                    name: name || email.split("@")[0],
                    avatar: picture || "",
                },
                include: { addresses: true }
            });
        } else if (!user.firebaseUid) {
            // Link existing user to Firebase UID if they registered before
            user = await prisma.user.update({
                where: { id: user.id },
                data: { firebaseUid: uid },
                include: { addresses: true }
            });
        }

        const userData: any = { ...user };
        delete userData.password; // Even though it's optional, remove it from response
        userData.isAdmin = getAdminStatus(userData.email);

        res.json({ user: userData });
    } catch (error) {
        console.error("Sync User Error:", error);
        res.status(500).json({ message: "Server Error syncing user" });
    }
};
