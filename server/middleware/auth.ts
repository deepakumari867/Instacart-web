import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "../config/prisma.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(" ")[1];
        
        // Verify Firebase token
        const decodedToken = await getAuth().verifyIdToken(token);

        // Fetch the real user from the database
        const user = await prisma.user.findUnique({
            where: { firebaseUid: decodedToken.uid }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found in database" });
        }

        // We set req.user to the real database user id
        req.user = { id: user.id };
        next();
    } catch (error) {
        console.log("Firebase Auth Error:", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;
