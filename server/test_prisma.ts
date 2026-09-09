import "dotenv/config";
import { prisma } from "./config/prisma.js";

async function main() {
    try {
        console.log("Testing Prisma...");
        const addresses = await prisma.address.findMany({
            where: { userId: "some-firebase-uid" },
            orderBy: { createdAt: "asc" },
        });
        console.log("Success:", addresses);
    } catch (e) {
        console.error("Error:", e);
    }
}
main();
