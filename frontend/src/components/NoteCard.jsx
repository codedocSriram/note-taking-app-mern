import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";
const NoteCard = (props) => {
    const handleDelete = async (event, id) => {
        event.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            await api.delete(`/notes/${id}`);
            props.setNotes((prev) => {
                return prev.filter((note) => note._id !== id);
            });
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.log("Error in deleting the note...", error);
            toast.error("Failed to delete note!");
        }
    };
    return (
        <Link
            to={`note/${props.note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">
                    {props.note.title}
                </h3>
                <p className="text-base-content/70 line-clamp-3">
                    {props.note.content}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(props.note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(event) => {
                                handleDelete(event, props.note._id);
                            }}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteCard;
