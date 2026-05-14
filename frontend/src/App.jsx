import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth, SignIn } from "@clerk/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import LoginPage from "./pages/LoginPage";

function ProtectedRoute({ children }) {
    const { isLoaded, userId } = useAuth();

    // Wait for Clerk to initialize
    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    // If no authenticated user → redirect
    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    // User authenticated
    return children;
}

function PublicRoute({ children }) {
    const { isLoaded, userId } = useAuth();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10 text-primary" />
            </div>
        );
    }

    if (userId) {
        return <Navigate to="/" replace />;
    }

    return children;
}

const App = () => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreatePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/note/:id"
                    element={
                        <ProtectedRoute>
                            <NoteDetailPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
};

export default App;
