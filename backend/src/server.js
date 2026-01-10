import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";

import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running in PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error starting the server...", error);
    });
