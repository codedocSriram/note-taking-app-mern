import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import App from "./App.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Publishable key: ", PUBLISHABLE_KEY);
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <App />
                <Toaster />
            </ClerkProvider>
        </BrowserRouter>
    </StrictMode>,
);
