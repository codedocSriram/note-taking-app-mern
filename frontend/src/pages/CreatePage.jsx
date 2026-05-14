import { api } from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const { getToken } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Please fill all details.");
            return;
        }
        setLoading(true);
        try {
            const token = await getToken();
            const newNote = {
                title,
                content,
            };
            await api.post("/notes", newNote, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Note Created Successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create note!");
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
