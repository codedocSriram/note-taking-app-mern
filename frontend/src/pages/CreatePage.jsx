import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All fields required!");
            return;
        }
        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content,
            });
            toast.success("Note created successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating note...", error);
            if (error.response.status === 429) {
                toast.error("Slow down...too many notes are being created!", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to create note, please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link
                        to={"/"}
                        className="btn btn-ghost mb-6 border-1 border-white border-solid"
                    >
                        <ArrowLeftIcon className="size-5 text-primary" />
                        Back to Notes
                    </Link>
                    <div className="card bg-base-100">
                        <div className="card-body ">
                            <h2 className="card-title text-2xl mb-4 text-secondary">
                                Create New Note 📝
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-bold">
                                            Title:
                                        </span>
                                    </label>
                                    <input
                                        className="input input-bordered placeholder:text-primary"
                                        type="text"
                                        placeholder="Note Title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
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
                                        className="textarea textarea-bordered h-32 placeholder:text-secondary"
                                        placeholder="Write your note here..."
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mb-4"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
