import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.dbUser._id,
        }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            res.status(404).json({
                message: "No note found with the mentioned ID",
            });
            return;
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            user: req.dbUser._id,
            title: title,
            content: content,
        });
        await newNote.save();
        res.status(201).json({
            message: "Note Created Successfully!",
            data: newNote,
        });
    } catch (error) {
        console.log("Error in createNote controller: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await Note.findOne({
            _id: req.params.id,
            user: req.dbUser._id,
        });
        // const updatedNote = await Note.findByIdAndUpdate(
        //     id,
        //     {
        //         title,
        //         content,
        //     },
        //     { new: true },
        // );
        if (!note) {
            res.status(404).json({
                message: "No note found with the mentioned ID",
            });
            return;
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        console.log("Error in updateNote controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete({
            _id: id,
        });
        if (!deletedNote) {
            res.status(404).json({
                message: "No note found with the mentioned ID",
            });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.log("Error in deleteNote controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
