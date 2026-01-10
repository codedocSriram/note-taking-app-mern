import mongoose from "mongoose";

// Creating a schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {},
    },
    { timestamps: true } //this will give us the createdAt & updatedAt fields
);

// Creating model based on the Schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
