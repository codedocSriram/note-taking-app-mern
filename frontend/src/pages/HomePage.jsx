import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import NavBar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import { api } from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = await getToken();
                const res = await api.get("/notes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setNotes(res.data);
                setIsRateLimited(false);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching data");
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);
    return (
        <div className="min-h-screen">
            <NavBar />
            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && (
                    <div className="min-h-screen bg-base-200 flex items-center justify-center">
                        <LoaderIcon className="animate-spin size-10 text-primary" />
                    </div>
                )}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                setNotes={setNotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
