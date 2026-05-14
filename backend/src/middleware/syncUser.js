import User from "../models/User.js";
import {
    clerkMiddleware,
    clerkClient,
    requireAuth,
    getAuth,
} from "@clerk/express";

const syncUser = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        const clerkId = userId;
        let user = await User.findOne({ clerkId });

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            const email = clerkUser.emailAddresses[0]?.emailAddress;
            user = await User.create({
                clerkId,
                email,
            });
        }

        req.dbUser = user;
        next();
    } catch (error) {
        console.log("Error in syncUser controller:", error.message);
        res.status(500).json({ error: "User Sync failed" });
    }
};

export default syncUser;
