import express from "express";
import { requireAuth } from "@clerk/express";
import syncUser from "../middleware/syncUser.js";
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
} from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.use(requireAuth());

notesRouter.use(syncUser);

notesRouter.get("/", getAllNotes);

notesRouter.get("/:id", getNoteById);

notesRouter.post("/", createNote);

notesRouter.put("/:id", updateNote);

notesRouter.delete("/:id", deleteNote);

export default notesRouter;
