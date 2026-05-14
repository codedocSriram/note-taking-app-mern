import React from "react";
import { formatDate } from "../lib/utils";
import { Link, useNavigate } from "react-router";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { PenSquareIcon, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/react";
const NoteCard = ({ note, setNotes }) => {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const handleDelete = async (e, id) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this note?")) {
                return;
            }
            const token = await getToken();
            await api.delete(`/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Note deleted successfully!");
            setNotes((prev) => prev.filter((note) => note._id !== id));
            return;
        } catch (error) {
            console.log(error);
            toast.error("Error deleting the note!");
        }
    };

    return (
        <Link
            to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-primary">{note.title}</h3>
                <p className="text-secondary line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(note.createdAt)}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, note._id)}
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteCard;
