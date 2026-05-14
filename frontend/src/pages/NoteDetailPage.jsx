import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/react";
import { api } from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = ({ setNotes }) => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = await getToken();
                const res = await api.get(`/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching note", error);
                toast.error("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    console.log({ note });

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            setLoading(true);
            const token = await getToken();
            await api.delete(`/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Note deleted successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error deleteing the note", error);
            toast.error("Error deleting the note!");
        } finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add title or content");
            return;
        }
        try {
            setSaving(true);
            const token = await getToken();
            await api.put(`/notes/${id}`, note, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Note updated Successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error updating note", error);
            toast.error("Error updating note");
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10 text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            to="/"
                            className="btn btn-ghost mb-6 border-1 border-white border-solid"
                        >
                            <ArrowLeftIcon className="size-5 text-primary" />
                            Back to Notes
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline mb-6"
                        >
                            <Trash2Icon className="size-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-bold">
                                        Title:
                                    </span>
                                </label>
                                <input
                                    className="input input-bordered placeholder:text-primary text-primary"
                                    type="text"
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-bold">
                                        Content:
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-32 placeholder:text-secondary text-secondary"
                                    value={note.content}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            content: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
