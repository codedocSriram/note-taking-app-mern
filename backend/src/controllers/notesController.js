import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller...", error);
        res.status(500).json({
            message: `Internal server error...${error}`,
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if (!note) {
            res.status(404).json({
                message: "No note with such ID present",
            });
            res.end();
            return;
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in @getNoteById in notesController...", error);
        res.status(500).json({
            message: `Internal server error...${error}`,
        });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log("Error in @getAllNotes in notesController...", error);
        res.status(500).json({
            message: `Internal server error...${error}`,
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;
        const result = await Note.findByIdAndUpdate(
            id,
            {
                title,
                content,
            },
            { new: true }
        );
        if (!result) {
            res.status(404).json({
                message: "No note with such ID present",
            });
            res.end();
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in @updateNote in notesController...", error);
        res.status(500).json({
            message: `Internal server error...${error}`,
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Note.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({
                message: "No notes with such ID found",
            });
            res.end();
            return;
        }
        res.status(200).json({
            message: " Note deleted Successfully!",
        });
    } catch (error) {
        console.log("Error in @deleteNote in notesController...", error);
        res.status(500).json({
            message: `Internal server error...${error}`,
        });
    }
};
